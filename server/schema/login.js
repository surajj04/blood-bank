const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
});


const UserData = new mongoose.model("user-data",userData);

module.exports = UserData;