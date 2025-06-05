const express = require('express');
const clientController = require('../../controllers/v1/clientController');
const jwtMiddleware = require('../../middlewares/authMiddleware');
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/editClientProfile", jwtMiddleware,clientController.editClientProfile);
router.post("/editClientServices", jwtMiddleware, clientController.editClientServices);
router.post("/getClientProfile", jwtMiddleware, clientController.getClientProfile);



module.exports = router;
