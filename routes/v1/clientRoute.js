const express = require('express');
const clientController = require('../../controllers/v1/clientController');
const jwtMiddleware = require('../../middlewares/authMiddleware');


const router = express.Router();

router.post("/editClientProfile", jwtMiddleware,clientController.editClientProfile);

module.exports = router;
