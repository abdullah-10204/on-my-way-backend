const Therapist = require("../../models/therapistUser.models.js") ;
const FavouriteTherapist = require("../../models/favourite.model.js") ;

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
        const user = await Therapist.findById(userID);
        if (!user) {
            return res.status(400).json({ message: "User with user ID doesn't exist! " });
        }
        // Update user data
        user.profilePhoto = req.file ? req.file.filename : req.body.profilePhoto ||  user.profilePhoto;
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
exports.GetAllTherapists = async (req, res) => {
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

exports.toggleFavouriteTherapist = async (req, res) => {
    try {
        const { therapistId } = req.body;

        const therapistExists = await Therapist.findById(therapistId);
        if (!therapistExists) {
            return res.status(404).json({ message: "Therapist not found." });
        }

        let record = await FavouriteTherapist.findOne({ therapistId });

        if (!record) {
            // If no record exists, create one and mark as favourite
            record = new FavouriteTherapist({ therapistId, isFavourite: true });
            await record.save();
            return res.status(201).json({ message: "Therapist marked as favourite.", isFavourite: true });
        }

        // Toggle isFavourite
        record.isFavourite = !record.isFavourite;
        await record.save();

        res.status(200).json({
            message: record.isFavourite ? "Therapist marked as favourite." : "Therapist un-favourited.",
            isFavourite: record.isFavourite
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFavouriteTherapists = async (req, res) => {
    try {
        const favourites = await FavouriteTherapist.find({ isFavourite: true }).populate("therapistId");
        res.status(200).json({message:"Get All Favourite Therapists Successfully",favourites});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


