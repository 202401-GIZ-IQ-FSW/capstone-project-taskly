const express = require('express');
const router = express.Router();

const projectController = require('../../controllers/project/projectController');
 


// Create a new project
router.post('/', projectController.createProject);

// Get all projects for the current user
router.get('/user/:userId', projectController.getAllProjects);

// Get a specific project by ID
router.get('/:projectId', projectController.getProjectById);

// Update a project by ID
router.put('/:projectId', projectController.updateProjectById);

// Delete a project by ID
router.delete('/:projectId', projectController.deleteProjectById);

module.exports = router;
