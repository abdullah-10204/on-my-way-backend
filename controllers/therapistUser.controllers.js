import Therapist from "../models/therapistUser.models.js";
import bcrypt from "bcryptjs";

const SignUpTherapist = async (req, res) => {
    try {
        const {
            profilePhoto,
            fullName,
            email,
            phone,
            password,
            DateOfBirth,
            gender,
            address,
            city,
            prefferedClientAgegroup,
            diagnosisOptions,
            travelTime,
            therapyType,
            bankingDetails,
            AHPRANumber,
            field,
            SPAResgistrationNumber,
            WWCCNumber,
            ABNNumber,
            digitalSignature,
            chargesPerHour
        } = req.body;

        // Check if the user already exists
        const existingUser = await Therapist.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new Therapist({
            profilePhoto: profilePhoto || "",
            fullName,
            email,
            phone,
            password: hashedPassword,
            DateOfBirth,
            gender,
            address,
            city,
            prefferedClientAgegroup,
            diagnosisOptions,
            travelTime,
            therapyType,
            bankingDetails,
            AHPRANumber,
            field,
            SPAResgistrationNumber,
            WWCCNumber,
            ABNNumber,
            digitalSignature,
            chargesPerHour
        });

        await newUser.save();

        res.status(201).json({ message: "Therapist account created successfully" }, { newUser: newUser.toObject });
    } catch (error) {
        console.error("SignUpTherapist Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const SignInTherapist = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Therapist.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with email doesn't exist! " });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Return user data without password
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        console.error("LoginTherapist Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

const GetTherapistProfileData = async (req, res) => {
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

const EditTherapistProfileData = async (req, res) => {
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

const GetTherapistServicesData = async (req, res) => {
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

const EditTherapistServicesData = async (req, res) => {
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


export { SignUpTherapist, SignInTherapist, GetTherapistProfileData, EditTherapistProfileData, GetTherapistServicesData, EditTherapistServicesData }