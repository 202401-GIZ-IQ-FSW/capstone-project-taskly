// server\server\controllers\Tickets\ticketCrudController.js
const TicketModel = require('../../models/TicketModel');
// const sendEmails = require('../../config/mailer');
const UserModel = require('../../models/UserModel');

const createTicket = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, priority, assignees } = req.body;

    // Basic validation
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }

    const highestOrderTicket = await TicketModel.findOne({
      projectId,
      status: 'open',
    })
      .sort({ order: -1 })
      .exec();

    const nextOrder = highestOrderTicket ? highestOrderTicket.order + 1 : 1;

    const newTicket = new TicketModel({
      title,
      description,
      priority,
      projectId,
      order: nextOrder,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating ticket', error: error.message });
  }
};

const getAllTickets = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    let tickets = await TicketModel.find({ projectId })
      .populate('assignees', ['_id', 'profilePicture', 'username', 'firstName'])
      .sort({ order: 1 })
      .exec();
    tickets = await sortItems(tickets);
    res.status(200).json({ tickets });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving tickets', error: error.message });
  }
};

async function sortItems(tickets) {
  const statuses = ['open', 'in progress', 'resolved', 'closed'];
  let orders = [-1, -1, -1, -1];

  for (const item of tickets) {
    const statusIndex = statuses.indexOf(item.status);
    if (statusIndex !== -1) {
      orders[statusIndex] += 1;
      if (item.order !== orders[statusIndex]) {
        const ticket = await TicketModel.findById(item._id);
        ticket.order = orders[statusIndex];
        item.order = orders[statusIndex];
        await ticket.save();
      }
    }
  }

  return tickets;
}

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await TicketModel.findById(ticketId).populate({
      path: 'assignees',
      select: 'username email', // Specify the fields you want to select from the User model
    });
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving ticket', error: error.message });
  }
};

const updateTicket = async (req, res) => {
  const ticketId = req.params.ticketId;

  const projectId = req.params.projectId;
  const { newStatus, newOrder } = req.body;

  try {
    if (newOrder < 0) {
      const ticket = await TicketModel.findOne({ status: newStatus, order: 0 });
      if (ticket) {
        ticket.order = 0.9;
        await ticket.save();
      }
    }
    await TicketModel.findByIdAndUpdate(
      ticketId,
      { status: newStatus, order: newOrder },
      { new: true, runValidators: true }
    );
    let tickets = await TicketModel.find({ projectId })
      .populate('assignees', ['_id', 'profilePicture', 'username', 'firstName'])
      .sort({ order: 1 })
      .exec();
    tickets = await sortItems(tickets);

    if (tickets) {
      // send users emails for telling them that the ticket has updated
      // const userEmail = updatedTicket.user.email;
      // const subject =  `your ticket has been updated ${ticketId}`;
      // const text = `Dear user,\n\nYour ticket with ID ${ticketId} is now ${updatedTicket.status}.\n\nThank you,\nSupport Team`;

      // await sendEmails(userEmail, subject, text);
      res.status(200).json(tickets);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating ticket', error: error.message });
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
    res
      .status(500)
      .json({ message: 'Error deleting ticket', error: error.message });
  }
};

const assignTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const { assigneeId, assigneeUsername, assigneeEmail } = req.body;

  try {
    // Find the user by ID, username, or email
    let assigneeUser;
    if (assigneeId) {
      assigneeUser = await UserModel.findById(assigneeId);
    } else if (assigneeUsername) {
      assigneeUser = await UserModel.findOne({ username: assigneeUsername });
    } else if (assigneeEmail) {
      assigneeUser = await UserModel.findOne({ email: assigneeEmail });
    }

    if (!assigneeUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const foundTicket = await TicketModel.findById(ticketId);

    if (foundTicket) {
      if (!foundTicket.assignees.includes(assigneeUser._id)) {
        foundTicket.assignees.push(assigneeUser._id);
        await foundTicket.save();

        // Populate the assignees with username and email
        await foundTicket.populate({
          path: 'assignees',
          select: 'username email',
        });

        res.status(200).json(foundTicket);
      } else {
        res
          .status(400)
          .json({ message: 'User already assigned to this ticket' });
      }
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error assigning ticket', error: error.message });
  }
};

const unassignTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const { assigneeId, assigneeUsername, assigneeEmail } = req.body;

  try {
    // Find the user by ID, username, or email
    let assigneeUser;
    if (assigneeId) {
      assigneeUser = await UserModel.findById(assigneeId);
    } else if (assigneeUsername) {
      assigneeUser = await UserModel.findOne({ username: assigneeUsername });
    } else if (assigneeEmail) {
      assigneeUser = await UserModel.findOne({ email: assigneeEmail });
    }

    if (!assigneeUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const foundTicket = await TicketModel.findById(ticketId);

    if (foundTicket) {
      if (foundTicket.assignees.includes(assigneeUser._id)) {
        foundTicket.assignees.pull(assigneeUser._id);
        await foundTicket.save();

        // Populate the assignees with username and email
        await foundTicket.populate({
          path: 'assignees',
          select: 'username email',
        });

        res.status(200).json(foundTicket);
      } else {
        res.status(400).json({ message: 'User not assigned to this ticket' });
      }
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error unassigning ticket', error: error.message });
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
