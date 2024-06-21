// server\server\routes\tickets\ticket.js
const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/Tickets/ticketCrudController');
const { validateObjectId } = require('../../middleware/validateObjectId');

router.post('/:projectId/tickets/', ticketController.createTicket);
router.get('/:projectId/tickets/', ticketController.getAllTickets);
router.get('/:projectId/tickets/:ticketId', validateObjectId('ticketId'), ticketController.getTicketById);
router.put('/:projectId/tickets/:ticketId', validateObjectId('ticketId'), ticketController.updateTicket);
router.delete('/:projectId/tickets/:ticketId', validateObjectId('ticketId'), ticketController.deleteTicket);

// Assign and unassign ticket routes
router.post('/:projectId/tickets/:ticketId/assign', validateObjectId('ticketId'), ticketController.assignTicket);
router.post('/:projectId/tickets/:ticketId/unassign', validateObjectId('ticketId'), ticketController.unassignTicket);

module.exports = router;
