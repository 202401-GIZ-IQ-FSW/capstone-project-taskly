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

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:projectId', validateObjectId('projectId'), getSingleProject);
router.put('/:projectId', validateObjectId('projectId'), updateProject);
router.delete('/:projectId', validateObjectId('projectId'), deleteProject);

// Project Tickets routes
router.use('/:projectId/tickets', validateObjectId('projectId'), ticketRoutes);

// routes for search and filter
router.get('/:projectId/tickets/search', searchTicket);
router.get('/:projectId/tickets/filter', filterTicket);

module.exports = router;
