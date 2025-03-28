const User = require("../Models/User");
const catchAsync = require("../utils/catchAsync");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Mailer = require("../services/mailer");
require("dotenv").config();

// sign JWT token
const signToken = (userId) => jwt.sign({ userId }, process.env.TOKEN_KEY);

// Register new user
exports.register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // user already registered
    const existing_user = await User.findOne({
        email: email,
    });

    let new_user;

    // user is already registered
    if (existing_user && existing_user.verified === true) {
        return res.status(403).json({
            status: "error",
            message: "Email already registered",
        });
    }
    // user not verified
    else if (existing_user && existing_user.verified === false) {
        new_user = await User.findOneAndUpdate(
            { email: email },
            {
                name,
                password,
            },
            { new: true, validateModifiedOnly: true }
        );
    }
    // no user found
    else {
        new_user = await User.create({ name, email, password });
    }

    req.userId = new_user._id;
    next();
});

// Send OTP
exports.sendOTP = catchAsync(async (req, res, next) => {
    const userId = req.userId;

    // Find the user first
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }

    // generate new OTP
    const new_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const otp_expiry_time = Date.now() + 10 * 60 * 1000;

    // Update user directly and save
    user.otp = new_otp.toString();
    user.otp_expiry_time = otp_expiry_time;
    await user.save();

    // Send opt via email
    Mailer({ name: user.name, email: user.email, otp: new_otp });

    res.status(200).json({
        status: "success",
        message: "OTP sent successfully",
    });
});

// Resend OTP
exports.resendOTP = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // user not found
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }

    // generate new OTP
    const new_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const otp_expiry_time = Date.now() + 10 * 60 * 1000;

    // update user doc
    user.otp = new_otp;
    await user.save({});

    // send otp via mail
    Mailer({ name: user.name, email: user.email, otp: new_otp });

    res.status(200).json({
        status: "success",
        message: "OTP sent successfully",
    });
});

// Verify OTP
exports.verifyOTP = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;

    const user = await User.findOne({
        email,
        // otp_expiry_time: { $gt: Date.now() },
    });

    // user not valid or otp expired
    if (!user) {
        return res.status(401).json({
            status: "error",
            message: "Email invalid or OTP expired",
        });
    }

    // user already exists (verified)
    if (user.verified) {
        return res.status(403).json({
            status: "error",
            message: "Email is already verified",
        });
    }

    // otp not matching
    if (!(await user.correctOTP(otp, user.otp))) {
        return res.status(400).json({
            status: "error",
            message: "Invalid OTP",
        });
    }

    // otp matches, update user
    user.verified = true;
    user.otp = undefined;

    await user.save({ new: true, validateModifiedOnly: true });

    // create jwt token
    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        message: "Email verified successfully",
        token,
        user_id: user._id,
    });
});

// Login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    // date invalid
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Please provide email and password",
        });
    }

    // search user with email and password
    const user = await User.findOne({ email }).select("+password");

    // user not found or password not exists
    if (!user || !user.password) {
        return res.status(401).json({
            status: "error",
            message: "Invalid email or password",
        });
    }

    // invalid email or wrong password
    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(401).json({
            status: "error",
            message: "Invalid email or password",
        });
    }

    // sign token
    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
        user_id: user._id,
    });
});

// Authorization (Protect endpoint)
exports.protect = catchAsync(async (req, res, next) => {
    try {
        // 1. get the auth token
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        // if token not found
        if (!token) {
            res.status(401).json({
                status: "error",
                message: "No token, authorization denied",
            });
        }

        // 2. verify token
        const decoded = promisify(jwt.verify)(token, process.env.TOKEN_KEY);

        // 3. if user exists
        const this_user = await User.findById(decoded.userId);

        if (!this_user) {
            res.status(401).json({
                status: "error",
                message: "User no longer exists",
            });
        }

        // 4. if user changed password after token was issued
        if (this_user.changedPasswordAfter(decoded.iat)) {
            res.status(401).json({
                status: "error",
                message: "User's password has changed. Please login again",
            });
        }

        // grant access to protected routes
        req.user = this_user;
        next();
    } catch (error) {
        console.log("Protect endpoint error: " + error);
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }
});
