const mongoose = require('mongoose');

const request = new mongoose.Schema({
    name: {
        type: String
    },
    bloodGrp: {
        type: String
    },
    contactNo: {
        type: Number
    },
    location: {
        type: String
    },
    date: { type: Date, 'default': Date.now }

})

const BloodReq = new mongoose.model("BloodReq", request);

module.exports = BloodReq;