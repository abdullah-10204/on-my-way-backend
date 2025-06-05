const mongoose = require('mongoose');

const favouriteTherapistSchema = new mongoose.Schema({
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    }
}, { timestamps: true });

const FavouriteTherapist = mongoose.model('FavouriteTherapist', favouriteTherapistSchema);
module.exports = FavouriteTherapist;
