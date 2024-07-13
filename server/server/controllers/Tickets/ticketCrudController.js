// server\server\controllers\Tickets\ticketCrudController.js
const TicketModel = require('../../models/TicketModel');
const sendEmails = require('../../config/mailer');

const createTicket = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, priority, assignees } = req.body;

    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newTicket = new TicketModel({
      title,
      description,
      priority,
      projectId,
      assignees,
    });
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

const getAllTickets = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const tickets = await TicketModel.find({ projectId }).populate('assignees', 'username email');
    res.status(200).json({ message: 'Tickets retrieved successfully', tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tickets', error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await TicketModel.findById(ticketId).populate('assignees', 'username email');
    if (ticket) {
      res.status(200).json({ message: 'Ticket retrieved successfully', ticket });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving ticket', error: error.message });
  }
};

const updateTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(ticketId, req.body, {
      new: true,
      runValidators: true,
    }).populate('assignees'); // Populate assignees to get their details

    if (updatedTicket) {
      // Retrieve the email addresses of the assignees
      const assignees = updatedTicket.assignees;
      const emailPromises = assignees.map(assignee => {
        const userEmail = assignee.email;
        const subject = `Ticket ${updatedTicket.title} Status Updated`;
        const text = `The status of the ticket "${updatedTicket.title}" has been updated to "${updatedTicket.status}".`;

        // Send the email
        return sendEmails(userEmail, subject, text);
      });

      // Wait for all emails to be sent
      await Promise.all(emailPromises);

      res.status(200).json({ message: 'Ticket updated successfully', ticket: updatedTicket });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const deletedTicket = await TicketModel.findByIdAndDelete(ticketId);
    if (deletedTicket) {
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};

const assignTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const assigneeId = req.body.assigneeId;

  try {
    const foundTicket = await TicketModel.findById(ticketId);

    if (foundTicket) {
      if (!foundTicket.assignees.includes(assigneeId)) {
        foundTicket.assignees.push(assigneeId);
        await foundTicket.save();

        // Populate the assignees with username and email
        const populatedTicket = await foundTicket.populate('assignees', 'username email');

        res.status(200).json({ message: 'Ticket assigned successfully', ticket: populatedTicket });
      } else {
        res.status(400).json({ message: 'User already assigned to this ticket' });
      }
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error assigning ticket', error: error.message });
  }
};

const unassignTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const assigneeId = req.body.assigneeId;

  try {
    const foundTicket = await TicketModel.findById(ticketId);

    if (foundTicket) {
      if (foundTicket.assignees.includes(assigneeId)) {
        foundTicket.assignees.pull(assigneeId);
        await foundTicket.save();

        // Populate the assignees with username and email
        const populatedTicket = await foundTicket.populate('assignees', 'username email');

        res.status(200).json({ message: 'Ticket unassigned successfully', ticket: populatedTicket });
      } else {
        res.status(400).json({ message: 'User not assigned to this ticket' });
      }
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error unassigning ticket', error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  assignTicket,
  unassignTicket,
};
