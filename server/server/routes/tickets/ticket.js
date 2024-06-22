const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/Tickets/ticketCrudController');
const { validateObjectId } = require('../../middleware/validateObjectId');

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/:ticketId', validateObjectId('ticketId'), ticketController.getTicketById);
router.put('/:ticketId', validateObjectId('ticketId'), ticketController.updateTicket);
router.delete('/:ticketId', validateObjectId('ticketId'), ticketController.deleteTicket);

// Assign and unassign ticket routes
router.post('/:ticketId/assign', validateObjectId('ticketId'), ticketController.assignTicket);
router.post('/:ticketId/unassign', validateObjectId('ticketId'), ticketController.unassignTicket);

module.exports = router;
