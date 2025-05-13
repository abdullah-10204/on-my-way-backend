const express = require('express');
const authController = require('../../controllers/v1/authController');
const clientController = require('../../controllers/v1/authController');
const referalRegisterController = require('../../controllers/v1/authController');
const upload = require("../../middlewares/upload");
const router = express.Router();

router.post('/signupTherapist', upload.single('profilePhoto'), authController.signUpTherapist);
router.post('/signUpClient', upload.single('profilePhoto'), clientController.signUpClient);
router.post('/signUpReferalRegister', upload.single('profilePhoto'), referalRegisterController.signUpReferalRegister);

router.post("/verify-email", authController.verifyEmail);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);

module.exports = router;
