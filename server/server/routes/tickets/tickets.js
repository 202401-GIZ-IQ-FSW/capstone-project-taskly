const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable merging params from parent routes
const ticketComments = require('./comments');

const ticketController = require('../../controllers/Tickets/ticketsController');
const { validateObjectId } = require('../../middleware/validateObjectId');

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/:ticketId', validateObjectId('ticketId'), ticketController.getTicketById);
router.put('/:ticketId', validateObjectId('ticketId'), ticketController.updateTicket);
router.delete('/:ticketId', validateObjectId('ticketId'), ticketController.deleteTicket);

// Assign and unassign ticket routes
router.post('/:ticketId/assign', validateObjectId('ticketId'), ticketController.assignTicket);
router.post('/:ticketId/unassign', validateObjectId('ticketId'), ticketController.unassignTicket);

// Ticket Comments Routes
router.use('/:ticketId/comments', validateObjectId('ticketId'), ticketComments);

module.exports = router;
