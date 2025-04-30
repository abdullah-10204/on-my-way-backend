const ReferalRegister = require("../../models/referalRegisteringUser.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUpReferalRegister = async (req, res) => {
    try {
        const {
            profilePhoto,
            fullName,
            email,
            phone,
            password,
            DateOfBirth,
            gender,
            city,
            resedentialAddress,
            businessName,
            businessAddress,
            businessWebsiteAddress,
            therapyServices,
            basicDiagnosis,
            preferTherapy,
            assessmentAndRiskAssessment,
            fundingTherapySection,
            planEndDate,
            fundingManagementType,
            termAndCondition
        } = req.body;

        const existingUser = await ReferalRegister.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new ReferalRegister({
            profilePhoto,
            fullName,
            email,
            phone,
            password: hashedPassword,
            DateOfBirth: new Date(DateOfBirth),
            gender,
            city,
            resedentialAddress,
            businessName,
            businessAddress,
            businessWebsiteAddress,
            therapyServices,
            basicDiagnosis,
            preferTherapy,
            assessmentAndRiskAssessment,
            fundingTherapySection,
            planEndDate,
            fundingManagementType,
            termAndCondition
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, role: 'referral' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const userData = savedUser.toObject();
        delete userData.password;

        res.status(201).json({
            success: true,
            message: 'Referral registered successfully',
            data: userData,
            token
        });

    } catch (error) {
        console.error('Error in signUpReferalRegister:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};