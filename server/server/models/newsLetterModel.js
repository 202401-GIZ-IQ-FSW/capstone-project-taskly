const mongoose = require('mongoose');
const { emit } = require('./UserModel');

const newsLetterSchema = new mongoose.Schema({
    email: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    sentAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('NewsletterSchema', newsLetterSchema);
