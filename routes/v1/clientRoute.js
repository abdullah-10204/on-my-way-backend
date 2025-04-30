const express = require('express');
const clientController = require('../../controllers/v1/clientController');
const upload = require("../../middlewares/upload");
const router = express.Router();

router.post('/signupClient', upload.single('profilePhoto'), clientController.signUpClient);

module.exports = router;
