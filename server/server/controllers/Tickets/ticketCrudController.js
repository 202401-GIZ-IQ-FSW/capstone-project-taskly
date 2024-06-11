const TicketModel = require('../../models/TicketModel');

const createTicket = async (req, res) => {
  try {
    const { title, description, priority, assignee_id } = req.body;
    const project_id = req.params.projectId;

    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newTicket = new TicketModel({
      title,
      description,
      priority,
      project_id,
      assignee_id,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const project_id = req.params.projectId;
    const tickets = await TicketModel.find({ project_id }).populate('assignee_id', 'username email');

    res.json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const ticket = await TicketModel.findById(ticketId).populate('assignee_id', 'username email');
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
    const updatedTicket = await TicketModel.findByIdAndUpdate(req.params.ticketId, req.body, {
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
    const deletedTicket = await TicketModel.findByIdAndDelete(req.params.ticketId);

    if (deletedTicket) {
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
    const { assignee_id } = req.body;

    const findTicket = await TicketModel.findById(req.params.ticketId);

    if (findTicket) {
      findTicket.assignee_id = assignee_id;
      await findTicket.save();
      res.json(findTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
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
