const express = require('express');
const appController = require('../../controllers/v1/appController');
const jwtMiddleware = require('../../middlewares/authMiddleware');
const upload = require("../../middlewares/upload");


const router = express.Router();

router.get("/GetTherapistProfileData", jwtMiddleware, appController.GetTherapistProfileData);
router.get("/GetTherapistServicesData", jwtMiddleware, appController.GetTherapistServicesData);
router.post("/EditTherapistProfileData", jwtMiddleware, upload.single('profilePhoto'), appController.EditTherapistProfileData);
router.post("/EditTherapistServicesData", jwtMiddleware, appController.EditTherapistServicesData);

module.exports = router;
