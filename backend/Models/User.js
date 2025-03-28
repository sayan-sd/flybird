const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        jobTitle: {
            type: String,
        },
        bio: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
        },
        avatar: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validator: function (email) {
                    return validator.isEmail(email);
                },
                message: (props) => `Email (${props.value}) is invalid!`,
            },
        },
        password: {
            type: String,
        },
        passwordChangedAt: {
            type: Date,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
        },
        otp_expiry_time: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Online", "Offline"],
            default: "Offline",
        },
        socketId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// "pre save" hook
userSchema.pre("save", async function (next) {
    // Hash the otp (run if otp modified)
    if (this.isModified("otp") && this.otp) {
        if (this.otp) {
            this.otp = await bcrypt.hash(this.otp.toString(), 10);
            console.log(this.otp.toString(), "hash otp in pre save");
        }
    }

    // Hash the password (run if password modified)
    if (this.isModified("password") && this.password) {
        if (this.password) {
            this.password = await bcrypt.hash(this.password.toString(), 10);
            console.log(this.password.toString(), "hash password in pre save");
        }
    }

    next();
});

// Method - otp validation
userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
    return await bcrypt.compare(candidateOTP, userOTP);
};

// Method - password validation
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Method - change password
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
