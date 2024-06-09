const express = require('express');
const router = express.Router();

const projectController = require('../../controllers/project/projectController');
 


// Create a new project
router.post('/api/v1/projects', projectController.newProject);

// Get all projects for the current user
router.get('/api/v1/projects/:userId', projectController.getAllProjects);

// Get a specific project by ID
router.get('/api/v1/projects/:projectId', projectController.getProjectById);

// Update a project by ID
router.put('/api/v1/projects/:projectId', projectController.updateProject);

// Delete a project by ID
router.delete('/api/v1/projects/:projectId', projectController.deleteProjectById);
 

module.exports = router;
