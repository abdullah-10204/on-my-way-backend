const express = require('express');
const appController = require('../../controllers/v1/appController');
const jwtMiddleware = require('../../middlewares/authMiddleware');
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/GetTherapistProfileData", jwtMiddleware, appController.GetTherapistProfileData);
router.post("/GetTherapistServicesData", jwtMiddleware, appController.GetTherapistServicesData);
router.get("/GetAllTherapistsData", jwtMiddleware, appController.GetAllTherapistsData);
router.post("/GetAllTherapists",jwtMiddleware,appController.GetAllTherapists);
router.post("/AddFavouriteTherapist", jwtMiddleware, appController.addFavouriteTherapist);
router.post("/RemoveFavouriteTherapist", jwtMiddleware, appController.removeFavouriteTherapist);

module.exports = router;
