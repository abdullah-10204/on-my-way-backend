const mongoose = require('mongoose');

const clientUserSchema = new mongoose.Schema({
    profilePhoto: {
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ["male", "female", "other"],
    },
    city: {
        type: String,
        trim: true,
        required: false,
    },
    resedentialAddress: {
        type: [String],
        required: true
    },
    therapyServices: {
        type: [String],
        required: false
    },
    diagonosis: {
        type: String,
        trim: true,
    },
    preferTherapy: {
        type: [String],
        required: false
    },
    assessmentAndRiskAssessment: {
        type: Boolean,
        required: false
    },
    fundingTherapySection: {
        type: String,
        trim: false
    },
    planEndDate: {
        type: String,
        trim: true
    },
    fundingManagementType: {
        type: String,
        trim: false
    },
    termAndCondition: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });

const Client = mongoose.model('Client', clientUserSchema);
module.exports = Client;

