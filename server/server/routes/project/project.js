const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../../middleware/validateObjectId');
const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  searchTickets,
  filterTicket,
} = require('../../controllers/project/projectController');

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:projectId', validateObjectId('projectId'), getSingleProject);
router.put('/:projectId', validateObjectId('projectId'), updateProject);
router.delete('/:projectId', validateObjectId('projectId'), deleteProject);
 

// routes for search and filter
router.get('/search', searchTickets);
router.get('/:projectId/tickets/filter', filterTicket);
module.exports = router;
