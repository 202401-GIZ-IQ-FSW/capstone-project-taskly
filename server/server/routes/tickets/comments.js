const express = require('express');
const router = express.Router();

const commentController = require('../../controllers/comment/commentController');

// Base path: /api/v1/projects/tickets/id/comments

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:commentId', commentController.getCommentById);
router.put('/:commentId', commentController.updateCommentById);
router.delete('/:commentId', commentController.deleteCommentById);

module.exports = router;
