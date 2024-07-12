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