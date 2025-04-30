const mongoose = require('mongoose');

const dummyUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    otp: {
        type: String,
        trim: true,
    },
    otpExpires: {
        type: Date,
        default: Date.now,
        expires: '5m'
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const DummyUser = mongoose.model('DummyUser', dummyUserSchema);
module.exports = DummyUser;