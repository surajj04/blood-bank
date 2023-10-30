const mongoose = require('mongoose');

const bloodstock = new mongoose.Schema({
    bloodType: {
        type: String
    },
    value: {
        type: Number
    }
})


const BloodStock = new mongoose.model("Blood-Stock", bloodstock);

module.exports = BloodStock;