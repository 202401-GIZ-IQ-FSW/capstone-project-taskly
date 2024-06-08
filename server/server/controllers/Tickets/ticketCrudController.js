const Ticket = require('../../models/TicketModel');

const createTicket = async (req, res) => {
  try {
    const { title, userId, priority } = req.body;
    const projectId = req.params.projectId;
    const newTicket = new Ticket({
      title,
      userId,
      priority,
      projectId: projectId,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tickets = await Ticket.find({ project_id: projectId })
      .populate('user_id', 'username email')
      .populate('assigned_to', 'username email');

    res.json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findById(ticketId)
      .populate('userId', 'username email')
      .populate('assignedTo', 'username email');
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {
      new: true,
      runValidators: true,
    });

    if (updatedTicket) {
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const deleteTicket = await Ticket.findByIdAndDelete(req.params.ticketId);

    if (deleteTicket) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { userId } = req.body;

    const findTicket = await Ticket.findById(req.params.ticketId);

    if (findTicket) {
      findTicket.assignedTo = userId;
      await findTicket.save();
      res.json(findTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    // Handle any errors that occur and respond with a 400 status code
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  assignTicket,
};
