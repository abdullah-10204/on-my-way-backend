const express = require('express');
const authController = require('../../controllers/v1/authController');
const upload = require("../../middlewares/upload"); 
const router = express.Router();


// router.post("/signup", upload.single("profileImage"), authController.signup);
router.post("/SignUpTherapist", authController.SignUpTherapist);
router.post("/SignInTherapist", authController.SignInTherapist);



module.exports = router;
