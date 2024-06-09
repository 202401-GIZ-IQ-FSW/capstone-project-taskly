const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/Tickets/ticketCrudController');

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/:ticketId', ticketController.getTicketById);
router.put('/:ticketId', ticketController.updateTicket);
router.delete('/:ticketId', ticketController.deleteTicket);

// Assign ticket route
router.post('/:ticketId/assign', ticketController.assignTicket);

module.exports = router;
