const nodemailer = require("nodemailer");
require("dotenv").config();
const OTPTemplate = require("../template/OTP");

// setup transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_APP_PASSWORD,
    },
});

const Mailer = async ({ name, otp, email }) => {
    const mailOptions = {
        to: email,
        subject: "Verify your FlyBird Account",
        html: OTPTemplate({ name, otp }),
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending email: " + error);
        throw new Error("Error sending email");
    }
};


module.exports = Mailer;