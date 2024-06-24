const mongoose = require('mongoose');
const { Schema } = mongoose; 

const replySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, 
{ 
    timestamps: true 
});

const commentSchema = new Schema({
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    replies: [replySchema] // Embedding reply schema to handle user replies to a comment
}, 
{ 
    timestamps: true 
});

// Pre-hook to populate replies and their user details before executing find queries
commentSchema.pre("find", function(next) {
    this.populate({
        path: "replies",
        populate: {
            path: "commentedBy"
        }
    });
    next();
});

 
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
