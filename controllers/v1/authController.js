const Therapist = require("../../models/therapistUser.models.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateOTP, sendOTP } = require('../../services/otpService.js');
const DummyUser = require("../../models/dummyUser.models.js");

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

        // const verificationCode = generateVerificationCode();
        // const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

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
            chargesPerHour,
            // isVerified: false,
            // verificationCode,
            // verificationCodeExpires,
        });

        await newUser.save();

        // if (email) {
        //     await sendEmailVerification(email, verificationCode);
        // }

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        const { password: _, ...userData } = newUser.toObject();

        res.status(200).json({
            message: "Account created successfully",
            user: userData,
            token
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

        // 1. Verify credentials
        const user = await Therapist.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 2. Generate and save OTP
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        user.isOtpVerified = false;
        await user.save();

        // 3. Send OTP
        await sendOTP(email, otp);

        res.status(200).json({
            message: "OTP sent to your email",
            userId: user._id,
            requiresOtp: true
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.SignInTherapist = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verify credentials
        const user = await Therapist.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 2. Generate and save OTP
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        user.isOtpVerified = false;
        await user.save();

        // 3. Send OTP
        await sendOTP(email, otp);

        res.status(200).json({
            message: "OTP sent to your email",
            userId: user._id,
            requiresOtp: true
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Sign In===============================
exports.VerifyEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already exists in the DummyUser collection
        const existingUser = await DummyUser.findOne({ email });
        const otp = generateOTP();

        if (existingUser) {
            existingUser.otp = otp;
            existingUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
            await existingUser.save();
        }
        else {
            const newUser = new DummyUser({ email });
            newUser.otp = otp;
            newUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
            await newUser.save();
        }

        await sendOTP(email, otp);

        res.status(200).json({
            message: "OTP sent to your email",
            requiresOtp: true,
            email: email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Verify OTP ===============================
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await DummyUser.findOne({ email, otp, isOtpVerified: false });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
                requiresResend: true
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                requiresResend: true
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired",
                requiresResend: true
            });
        }

        // OTP is valid, proceed with verification
        // Check if the user exists in the Therapist collection
        const therapistUser = await Therapist.findOne({
            email: user.email
        });
        if (!therapistUser) {
            return res.status(202).json({
                message: "User not found",
            });
        }


        // user.isOtpVerified = true;
        // user.otp = undefined;
        // user.otpExpires = undefined;
        // await user.save();
        await user.deleteOne({
            email: user.email
        })

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        const { password: _, ...userData } = therapistUser.toObject();
        res.status(200).json({
            message: "OTP verified successfully",
            user: userData,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Resend OTP===============================
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Therapist.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        user.isOtpVerified = false;
        await user.save();

        await sendOTP(email, otp);

        res.status(200).json({
            message: "New OTP sent to your email",
            success: true,
            email: email
        });

    } catch (error) {
        console.error("Error in resendOTP:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};