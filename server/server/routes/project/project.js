const express = require('express');
const router = express.Router();
const ticketRoutes = require('../tickets/tickets');
const { validateObjectId } = require('../../middleware/validateObjectId');
const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  searchTicket,
  filterTicket,
} = require('../../controllers/project/projectController');


// Routes for search and filter. IMPORTANT: keep these routes at the top of the file before the others
router.get('/:projectId/tickets/search',validateObjectId('projectId'), searchTicket);
router.get('/:projectId/tickets/filter',validateObjectId('projectId'), filterTicket);


router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:projectId', validateObjectId('projectId'), getSingleProject);
router.put('/:projectId', validateObjectId('projectId'), updateProject);
router.delete('/:projectId', validateObjectId('projectId'), deleteProject);

// Project Tickets routes
router.use('/:projectId/tickets', validateObjectId('projectId'), ticketRoutes);

module.exports = router;
