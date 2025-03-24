const router = require("express").Router();
const {
    register,
    sendOTP,
    verifyOTP,
    resendOTP,
    login,
} = require("../controllers/authController");

router.post("/signup", register, sendOTP);
router.post("/resend-otp", resendOTP);
router.post("/verify", verifyOTP);
router.post("/login", login);

module.exports = router;
