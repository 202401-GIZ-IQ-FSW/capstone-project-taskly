const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../../controllers/comment/commentController');
const { validateObjectId } = require('../../middleware/validateObjectId');

// Base path: /api/v1/projects/tickets/id/comments

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:commentId', validateObjectId('commentId'),commentController.getCommentById);
router.put('/:commentId', validateObjectId('commentId'),commentController.updateCommentById);
router.delete('/:commentId', validateObjectId('commentId'),commentController.deleteCommentById);

module.exports = router;
