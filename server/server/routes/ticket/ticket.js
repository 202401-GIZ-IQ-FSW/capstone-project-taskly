const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/Tickets/tickeCrud');


router.post('/api/v1/projects/:projectId/tickets', ticketController.creatTicket);
router.get('/api/v1/projects/:projectId/tickets', ticketController.getAllTickets);
router.get('/api/v1/projects/:projectId/tickets/:ticketId', ticketController.getAllTicketById);
router.put('/api/v1/projects/:projectId/tickets/:ticketId', ticketController.updateTicket);
router.delete('/api/v1/projects/:projectId/tickets/:ticketId', ticketController.deleteTicket);

// Assign ticket route
router.post('/api/v1/projects/:projectId/tickets/:ticketId/assign', ticketController.assignTicket);

module.exports = router;