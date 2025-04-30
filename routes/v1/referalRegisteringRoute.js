const express = require('express');
const ReferalRegister = require('../../controllers/v1/referalRegisteringController');
const upload = require("../../middlewares/upload");
const router = express.Router();

router.post('/signUpReferalRegister', upload.single('profilePhoto'), ReferalRegister.signUpReferalRegister);

module.exports = router;
