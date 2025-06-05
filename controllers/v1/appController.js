const Therapist = require("../../models/therapistUser.models.js");
const Client = require("../../models/clientUser.model.js");
const FavouriteTherapist = require("../../models/favourite.model.js");
//Get Therapist Profile data============================
exports.GetTherapistProfileData = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await Therapist.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User with user ID doesn't exist! " });
        }

        const userData = {
            profilePhoto: user.profilePhoto,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            DateOfBirth: user.DateOfBirth,
            address: user.address,
            gender: user.gender,
        }
        res.status(200).json({ message: "Login successful", user: userData });

    }
    catch (error) {
        console.error("GetTherapistProfileData Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//Edit Therapist Profile data============================
exports.EditTherapistProfileData = async (req, res) => {
    try {
        const { userID, fullName, email, phone, DateOfBirth, address, gender } = req.body;
        const user = await Therapist.findById({ _id: userID });
        if (!user) {
            return res.status(400).json({ message: "User with user ID doesn't exist! " });
        }
        // Update user data
        user.profilePhoto = req.file ? req.file.filename : req.body.profilePhoto || user.profilePhoto;
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.DateOfBirth = DateOfBirth || user.DateOfBirth;
        user.address = address || user.address;
        user.gender = gender || user.gender;
        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    }
    catch (error) {
        console.error("EditTherapistProfileData Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//Get Therapist Service data============================
exports.GetTherapistServicesData = async (req, res) => {
    try {
        const { userID } = req.body;
        const user = await Therapist.findById(userID);
        if (!user) {
            return res.status(400).json({ message: "User with user ID doesn't exist! " });
        }
        const servicesData = {
            prefferedClientAgegroup: user.prefferedClientAgegroup,
            diagnosisOptions: user.diagnosisOptions,
            travelTime: user.travelTime,
            therapyType: user.therapyType,
            field: user.field,
            chargesPerHour: user.chargesPerHour
        }
        res.status(200).json({ message: "Services data retrieved successfully!", servicesData });
    }
    catch (error) {
        console.error("GetTherapistProfileData Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//Edit Therapist Service data============================
exports.EditTherapistServicesData = async (req, res) => {
    try {
        const { userID, prefferedClientAgegroup, diagnosisOptions, travelTime, therapyType, field, chargesPerHour } = req.body;
        const user = await Therapist.findById(userID);
        if (!user) {
            return res.status(400).json({ message: "User with user ID doesn't exist! " });
        }
        // Update user data
        user.prefferedClientAgegroup = prefferedClientAgegroup || user.prefferedClientAgegroup;
        user.diagnosisOptions = diagnosisOptions || user.diagnosisOptions;
        user.travelTime = travelTime || user.travelTime;
        user.therapyType = therapyType || user.therapyType;
        user.field = field || user.field;
        user.chargesPerHour = chargesPerHour || user.chargesPerHour;
        await user.save();
        res.status(200).json({ message: "Services updated successfully", servicesData: { prefferedClientAgegroup, diagnosisOptions, travelTime, therapyType, field, chargesPerHour } });
    }
    catch (error) {
        console.error("EditTherapistProfileData Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//All Therapist data============================
exports.GetAllTherapistsData = async (req, res) => {
    try {

        const therapists = await Therapist.find({})
            .select('-__v -createdAt -updatedAt')
            .lean();

        res.status(200).json({
            success: true,
            count: therapists.length,
            therapists
        });

    } catch (error) {
        console.error('Error fetching therapists:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching therapists',
            error: error.message
        });
    }
};

exports.GetAllTherapists = async (req, res) => {
    try {
        const { clientLocation, clientId, page = 1 } = req.body;
        const limit = 10;
        const skip = (page - 1) * limit;

        if (!clientLocation) {
            return res.status(400).json({
                success: false,
                message: 'Client location is required'
            });
        }

        const therapists = await Therapist.find({})
            .skip(skip)
            .limit(limit)
            .lean();

        let favtherapist = [];
        if (clientId) {
            favtherapist = await FavouriteTherapist.find({ clientId })
                .populate('therapistId')
                .lean();
        }

        const totalTherapists = await Therapist.countDocuments();

        const distance = 2;
        const travelCost = 6;

        // Manually clone and inject static values into each object
        const therapistWithExtras = JSON.parse(JSON.stringify(therapists), (key, value) => {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                value.distance = distance;
                value.travelCost = travelCost;
            }
            return value;
        });

        const favtherapistWithExtras = JSON.parse(JSON.stringify(favtherapist), (key, value) => {
            if (key === 'therapistId' && typeof value === 'object' && value !== null) {
                value.distance = distance;
                value.travelCost = travelCost;
            }
            return value;
        });

        res.status(200).json({
            success: true,
            therapist: therapistWithExtras,
            favtherapist: favtherapistWithExtras,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalTherapists / limit),
                totalTherapists
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.addFavouriteTherapist = async (req, res) => {
    const { therapistId, clientId } = req.body;
    try {
        const therapist = await Therapist.findById(therapistId);
        if (!therapist) {
            return res.status(404).json({
                status: 'error',
                message: 'Therapist not found',
            });
        }

        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({
                status: 'error',
                message: 'Client not found',
            });
        }

        const existingFavourite = await FavouriteTherapist.findOne({
            therapistId,
            clientId
        });

        if (existingFavourite) {
            return res.status(400).json({
                status: 'failed',
                message: 'Therapist is already in favorites',
            });
        }

        const favourite = await FavouriteTherapist.create({
            therapistId,
            clientId
        });

        return res.status(200).json({
            status: 'success',
            message: 'Therapist added to favorites',
            data: favourite,
        });

    } catch (error) {
        console.error('Error adding favorite therapist:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong while adding favorite therapist',
            error: error.message,
        });
    }
};

exports.removeFavouriteTherapist = async (req, res) => {
    const { therapistId, clientId } = req.body;
    try {
        const deletedFavourite = await FavouriteTherapist.findOneAndDelete({ therapistId, clientId });

        if (deletedFavourite) {
            return res.status(200).json({
                status: 'success',
                message: 'Therapist removed from favorites',
                data: deletedFavourite,
            });
        } else {
            return res.status(404).json({
                status: 'failed',
                message: 'Favorite therapist not found',
            });
        }
    } catch (error) {
        console.error("Error removing favorite therapist:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Something went wrong while removing favorite therapist',
            error: error.message,
        });
    }
};

exports.GetAllFavouriteTherapist = async (req, res) => {
    try {
        const { clientId } = req.body;

        if (!clientId) {
            return res.status(400).json({
                success: false,
                message: "Client ID is required"
            });
        }

        const therapists = await Therapist.find({});

        const favouriteTherapists = await FavouriteTherapist.find({
            clientId: clientId,
            isFavourite: true
        });

        const favouriteTherapistMap = {};
        favouriteTherapists.forEach(ft => {
            favouriteTherapistMap[ft.therapistId.toString()] = true;
        });

        const therapistsWithFavouriteFlag = therapists.map(therapist => {
            return {
                ...therapist.toObject(),
                isFavourite: !!favouriteTherapistMap[therapist._id.toString()]
            };
        });

        res.status(200).json({
            success: true,
            data: therapistsWithFavouriteFlag
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};