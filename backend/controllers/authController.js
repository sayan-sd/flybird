const User = require("../Models/User");
const catchAsync = require("../utils/catchAsync");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

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
    const { userId } = req.userId;

    // generate new OTP
    const new_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const otp_exipry_time = Date.now() + 10 * 60 * 1000;

    // update user doc
    const user = await User.findByIdAndUpdate(
        userId,
        {
            otp: new_otp.toString(),
            otp_expiry_time: otp_exipry_time,
        },
        {
            new: true,
            validateModifiedOnly: true,
        }
    );

    // TODO => Send opt via email

    res.status(200).json({
        status: "success",
        message: "OTP sent successfully",
    });
});

// *Resend OTP (26)

// Verify OTP
exports.verifyOTP = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;

    const user = await User.findOne({
        email,
        otp_exipry_time: { $gt: Date.now() },
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
        res.status(400).json({
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
        message: "OTP verified successfully",
        token,
        user_id: user._id,
    });
});

// Login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

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

// Authentication (Protect)
