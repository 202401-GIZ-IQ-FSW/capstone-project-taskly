const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: String,
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    },
    createdAt: {
         type: Date,
         default: Date.now ,
    }

})

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;