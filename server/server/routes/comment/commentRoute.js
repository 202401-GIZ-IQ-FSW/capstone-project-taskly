const express = require('express');
const router = express.Router() // Merge params to access parent route params

const commentController = require('../../controllers/comment/commentController');

// Base path: /api/v1/projects/:projectId/tickets/:ticketId/comments

router.post('/', commentController.createComment);  
router.get('/', commentController.getAllComments);  
router.get('/:commentId', commentController.getCommentById);  
router.put('/:commentId', commentController.updateCommentById);  
router.delete('/:commentId', commentController.deleteCommentById);  

module.exports = router;
