// server\server\controllers\comment\commentController.js
const UserModel = require('../../models/UserModel');
const TicketModel = require('../../models/TicketModel');
const CommentModel = require('../../models/CommentModel');

// - POST /api/v1/projects/{projectId}/tickets/{ticketId}/comments - Create a new comment on a ticket
const createComment = async (req, res) => {
  const { ticketId } = req.params;
  const userId = req.user.id;
  const content = req.body.content;
  try {
    const checkTicket = await TicketModel.findById(ticketId);
    if (!checkTicket) {
      return res.status(401).json({ message: 'ticket not found' });
    }

    const newComment = await CommentModel.create({
      ticketId: ticketId,
      commentedBy: userId,
      content,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while creating the ticket',
      message: error.message,
    });
  }
};

// - GET /api/v1/projects/{projectId}/tickets/{ticketId}/comments - Get all comments for a ticket
const getAllComments = async (req, res) => {
  const { ticketId } = req.params;
  const userId = req.user.id;
  try {
    const checkTicket = await TicketModel.findById(ticketId);
    if (!checkTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comments = await CommentModel.find({ ticketId })
      .populate({
        path: 'commentedBy',
        select: 'username profilePicture',
      }) // populate commentedBy field with username
      .populate({
        path: 'replies.userId',
        select: 'username',
      });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while retrieving the comments',
      message: error.message,
    });
  }
};

// GET /api/v1/projects/{projectId}/tickets/{ticketId}/comments/{commentId} - Get a specific comment by ID
const getCommentById = async (req, res) => {
  const { ticketId, commentId } = req.params;

  try {
    const checkTicket = await TicketModel.findById(ticketId);
    if (!checkTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while retrieving the comment',
      message: error.message,
    });
  }
};

// PUT /api/v1/projects/{projectId}/tickets/{ticketId}/comments/{commentId} - Update a comment by ID
const updateCommentById = async (req, res) => {
  const { ticketId, commentId } = req.params;
  const { content } = req.body;

  try {
    const checkTicket = await TicketModel.findById(ticketId);
    if (!checkTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    let comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Update the comment
    comment.content = content;
    comment = await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while updating the comment',
      message: error.message,
    });
  }
};

// DELETE /api/v1/projects/{projectId}/tickets/{ticketId}/comments/{commentId} - Delete a comment by ID

const deleteCommentById = async (req, res) => {
  const { ticketId, commentId } = req.params;

  try {
    const checkTicket = await TicketModel.findById(ticketId);
    if (!checkTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.remove();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while deleting the comment',
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
