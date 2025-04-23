const Therapist = require("../../models/therapistUser.models.js") ;
const bcrypt = require('bcrypt');
const therapistUser = require('../../models/therapistUser.models.js');

//SignUpTherapist===============================
 exports.SignUpTherapist = async (req, res) => {
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

//SignInTherapist===============================
exports.SignInTherapist = async (req, res) => {
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


