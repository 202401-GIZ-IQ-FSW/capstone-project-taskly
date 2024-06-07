const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open','progressing','finished'],
        default: 'open'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, ref:'User', default: null
    },
})

module.exports = mongoose.model('Ticket', ticketSchema);
