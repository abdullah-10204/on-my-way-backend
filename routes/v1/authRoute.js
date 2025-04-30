const express = require('express');
const authController = require('../../controllers/v1/authController');
const upload = require("../../middlewares/upload");
const router = express.Router();

router.post('/signupTherapist', upload.single('profilePhoto'), authController.SignUpTherapist);
router.post("/SignInTherapist", authController.SignInTherapist);
router.post("/signIn", authController.SignIn);

// router.post('/verify', authController.verifyCode);
// router.post('/resend-code', authController.resendVerificationCode);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);


module.exports = router;
