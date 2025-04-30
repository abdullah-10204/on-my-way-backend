const mongoose = require('mongoose');

const referalRegisteringSchema = new mongoose.Schema({
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
    businessName: {
        type: String,
        required: true
    },
    businessAddress: {
        type: String,
        required: true
    },
    businessWebsiteAddress: {
        type: String,
        required: false
    },
    therapyServices: {
        type: [String],
        required: false
    },
    basicDiagnosis: {
        type: String,
        required: true
    },
    preferTherapy: {
        type: String,
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

const ReferalRegister = mongoose.model('ReferalRegister', referalRegisteringSchema);
module.exports = ReferalRegister;

