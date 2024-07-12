const Ticket = require('../../models/TicketModel');
const User = require('../../models/UserModel');
const Project = require('../../models/ProjectModel');


exports.getNewTickets = async (req, res)=> {
    try {
        const newTickets = await Ticket.find({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } }); // get the latest tickets
        res.json(newTickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getNewUsers = async (req, res) => {
    try {
        const newUsers = await User.find({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } });
        res.json(newUsers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getNewProjects = async (req, res) => {
    try {
        const newProjects = await Project.find({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } });
        res.json(newProjects);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getResolvedTickets = async (req, res) => {
    try {
        const resolvedTickets = await Ticket.find({ status: 'resolved', updatedAt: { $gte: new Date(Date.now() - 24*60*60*1000) } });
        res.json(resolvedTickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};