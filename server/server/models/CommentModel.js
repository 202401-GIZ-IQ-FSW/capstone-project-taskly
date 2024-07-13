const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema(
  {
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
      required: true,
    },
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

// Pre-hook to populate commentedBy field with specific fields
commentSchema.pre('find', function (next) {
  this.populate({
    path: 'commentedBy',
    select: 'username id email profilePicture', // Specify the fields to populate
  });
  next();
});

commentSchema.pre('findOne', function (next) {
  this.populate({
    path: 'commentedBy',
    select: 'username id email profilePicture', // Specify the fields to populate
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
