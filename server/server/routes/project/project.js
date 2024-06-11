const express = require('express');
const router = express.Router();

const projectController = require('../../controllers/project/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Get all projects for the current user
router.get('/', projectController.getAllProjects);

// Get a specific project by ID
router.get('/:projectId', projectController.getSingleProject);

// Update a project by ID
router.put('/:projectId', projectController.updateProject);

// Delete a project by ID
router.delete('/:projectId', projectController.deleteProject);

module.exports = router;
