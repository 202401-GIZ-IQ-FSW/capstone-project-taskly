const express = require('express');
const router = express.Router();


const { getAllTickets, getAllUsers, getAllProjects, getResolvedTickets, getOpenedTickets } = require('../../controllers/analysis/analysisController');


router.get('/analytics/all-tickets', getAllTickets);
router.get('/analytics/all-users', getAllUsers);
router.get('/analytics/all-projects', getAllProjects);
router.get('/analytics/resolved-tickets', getResolvedTickets);
router.get('/analytics/opened-tickets', getOpenedTickets);

module.exports = router;