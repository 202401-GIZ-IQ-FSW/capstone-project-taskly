const express = require('express');
const router = express.Router() // Merge params to access parent route params

const commentController = require('../../controllers/comment/commentController');

// Base path: /api/v1/projects/:projectId/tickets/:ticketId/comments

router.post('/:projectId/tickets/:ticketId/comments/', commentController.createComment);  
router.get('/:projectId/tickets/:ticketId/comments/', commentController.getAllComments);  
router.get('/:projectId/tickets/:ticketId/comments/:commentId', commentController.getCommentById);  
router.put('/:projectId/tickets/:ticketId/comments/:commentId', commentController.updateCommentById);  
router.delete('/:projectId/tickets/:ticketId/comments/:commentId', commentController.deleteCommentById);  

module.exports = router;
