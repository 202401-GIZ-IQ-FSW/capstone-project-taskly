const express = require('express');
const router = express.Router();


const { getAllTickets, getAllUsers, getAllProjects, getResolvedTickets, getOpenedTickets } = require('../../controllers/analysis/analysisController');


router.get('/all-tickets', getAllTickets);
router.get('/all-users', getAllUsers);
router.get('/all-projects', getAllProjects);
router.get('/resolved-tickets', getResolvedTickets);
router.get('/opened-tickets', getOpenedTickets);

module.exports = router;