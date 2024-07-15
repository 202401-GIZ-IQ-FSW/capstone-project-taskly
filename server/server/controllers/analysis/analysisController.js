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

const getProjectsOverTime = async (req, res) => {
    try {
        const projects = await Project.find({});
        const currentDate = new Date();

        const projectsOverTime = projects.reduce((acc, project) => {
            const createdDate = new Date(project.createdAt);
            if (isNaN(createdDate.getTime())) {
                console.error(`Invalid Date for project ID: ${project._id}, createdAt: ${project.createdAt}`);
                return acc; // Skip this entry
            }
            const month = createdDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(projectsOverTime);
        const counts = Object.values(projectsOverTime);

        res.json({ labels, counts });
    } catch (error) {
        console.error(`Error fetching projects: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}


const getTicketsByPriority = async(req, res) => {
    try {
        const tickets = await Ticket.find({});
        const priorityDistribution = tickets.reduce((acc, ticket) => {
            acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(priorityDistribution);
        const counts = Object.values(priorityDistribution);

        res.json({ labels, counts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProjects,
    getAllTickets,
    getAllUsers,
    getOpenedTickets,
    getResolvedTickets,
    getProjectsOverTime,
    getTicketsByPriority
    
}