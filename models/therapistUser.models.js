const mongoose = require('mongoose');

const therapistUserSchema = new mongoose.Schema({
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
    DateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    addressOne: {
        type: String,
        required: true
    },
    addressTwo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        trim: true,
    },
    prefferedClientAgegroup: {
        type: [String],
    },
    diagnosisOptions: {
        type: [String],
    },
    travelTime: {
        type: Number,
        min: 0
    },
    therapyType: {
        type: String,
        enum: ["Home Visit", "Telehealth", "Both"],
        trim: true
    },
    bankingDetails: {
        type: String,
        required: true,
        trim: true
    },
    AHPRANumber: {
        type: String,
        trim: true
    },
    field: {
        type: String,
        trim: true
    },
    SPAResgistrationNumber: {
        type: String,
        required: true,
        trim: true
    },
    WWCCNumber: {
        type: String,
        trim: true
    },
    ABNNumber: {
        type: String,
        required: true,
        trim: true
    },
    digitalSignature: {
        type: String,
        required: true,
        trim: true
    },
    chargesPerHour: {
        type: Number,
        min: 0,
        max: 1000
    },
    role: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Therapist = mongoose.model('Therapist', therapistUserSchema);
module.exports = Therapist;

