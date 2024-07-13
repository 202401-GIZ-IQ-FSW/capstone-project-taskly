const Ticket = require('../../models/TicketModel');
const User = require('../../models/UserModel');
const Project = require('../../models/ProjectModel');


const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getResolvedTickets = async (req, res) => {
    try {
        const resolvedTickets = await Ticket.find({ status: 'resolved' });
        res.json(resolvedTickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOpenedTickets = async (req, res) => {
    try {
        const openedTickets = await Ticket.find({ status: 'open' });
        res.json(openedTickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllProjects,
    getAllTickets,
    getAllUsers,
    getOpenedTickets,
    getResolvedTickets
    
}