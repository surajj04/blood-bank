const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    },
    message: {
        type: String
    }
});

const ContactForm = new mongoose.model("Contact-From",contact);

module.exports = ContactForm;