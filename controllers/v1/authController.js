const Therapist = require("../../models/therapistUser.models.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//SignUpTherapist===============================
exports.SignUpTherapist = async (req, res) => {
    try {
        const {
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

        const addressArray = address ? address.split(',') : [];

        const prefferedClientAgegroupArray = prefferedClientAgegroup
            ? req.body.prefferedClientAgegroup.split(',')
            : [];

        const diagnosisOptionsArray = diagnosisOptions
            ? req.body.diagnosisOptions.split(',')
            : [];

        // Create a new user
        const newUser = new Therapist({
            profilePhoto: req.file ? req.file.path : "", // Use the uploaded file path
            fullName,
            email,
            phone,
            password: hashedPassword,
            DateOfBirth,
            gender,
            address: addressArray,
            city,
            prefferedClientAgegroup: prefferedClientAgegroupArray,
            diagnosisOptions: diagnosisOptionsArray,
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

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Remove password from response
        const { password: _, ...userData } = newUser.toObject();

        res.status(201).json({
            message: "Therapist account created successfully",
            user: userData,
            token // Send the token to client
        });
    } catch (error) {
        console.error("SignUpTherapist Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//SignInTherapist===============================
exports.SignInTherapist = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Therapist.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        const { password: _, ...userData } = user.toObject();
        res.status(200).json({
            message: "Login successful",
            user: userData,
            token // Send the token to the client
        });
    } catch (error) {
        console.error("LoginTherapist Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

