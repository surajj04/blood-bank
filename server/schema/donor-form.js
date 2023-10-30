const mongoose = require('mongoose');

const donor = new mongoose.Schema({
    name: {
        type: String
    },
    contactNo: {
        type: Number
    },
    bloodGrp: {
        type: String
    },
    date: { type: Date, 'default': Date.now }
});

const DonorForm = new mongoose.model("Donor-form", donor);
module.exports = DonorForm;