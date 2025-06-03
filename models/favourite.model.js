const mongoose = require('mongoose');

const favouriteTherapistSchema = new mongoose.Schema({
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true,
        unique: true
    },
    isFavourite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const FavouriteTherapist = mongoose.model('FavouriteTherapist', favouriteTherapistSchema);
module.exports = FavouriteTherapist;
