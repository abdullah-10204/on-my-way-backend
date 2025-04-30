const Client = require("../../models/clientUser.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUpClient = async (req, res) => {
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
            therapyServices,
            diagonosis,
            preferTherapy,
            assessmentAndRiskAssessment,
            planEndDate,
            fundingTherapySection,
            fundingManagementType,
            termAndCondition
        } = req.body;

        if(!fullName && !email && !phone && !password && !DateOfBirth && !resedentialAddress && !diagonosis && !planEndDate){
             res.json({message:"Fields is Required"})
        }

        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({
                success: false,
                message: 'Client with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newClient = new Client({
            profilePhoto,
            fullName,
            email,
            phone,
            password: hashedPassword,
            DateOfBirth: new Date(DateOfBirth),
            gender,
            city,
            resedentialAddress,
            therapyServices,
            diagonosis,
            preferTherapy,
            assessmentAndRiskAssessment,
            planEndDate,
            fundingTherapySection,
            fundingManagementType,
            termAndCondition
        });

        const savedClient = await newClient.save();

        const token = jwt.sign(
            { id: savedClient._id, email: savedClient.email, role: 'client' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const clientData = savedClient.toObject();
        delete clientData.password;

        res.status(201).json({
            success: true,
            message: 'Client registered successfully',
            data: clientData,
            token
        });

    } catch (error) {
        console.error('Error in signUpClient:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}