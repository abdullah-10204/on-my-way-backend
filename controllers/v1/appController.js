const Therapist = require("../../models/therapistUser.models.js") ;

//Get Therapist Profile data============================
exports.GetTherapistProfileData = async (req, res) => {
    try {
        const { userID } = req.body;

        const user = await Therapist.findById(userID);
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
        const { userID, profilePhoto, fullName, email, phone, DateOfBirth, address } = req.body;
        const user = await Therapist.findById(userID);
        if (!user) {
            return res.status(400).json({ message: "User with user ID doesn't exist! " });
        }
        // Update user data
        user.profilePhoto = profilePhoto || user.profilePhoto;
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.DateOfBirth = DateOfBirth || user.DateOfBirth;
        user.address = address || user.address;
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

