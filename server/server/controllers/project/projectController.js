const ProjectModel = require('../../models/ProjectModel');
const User  = require('../../models/UserModel');


// Create a new project
const createProject = async (req, res) => {
  try {
      const { name, description, owner_id } = req.body;

      // Check if the body exists
      if (!name || !description || !owner_id) {
          return res.status(400).json({ message: "Fields are required!" });
      }

      const project = new ProjectModel({
          name,
          description,
          owner_id
      });
      await project.save();
      res.status(201).json(project);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the project' });
  }
};

// Get all projects for the current user
const getAllProjects = async (req, res) => {
  try {
      const userId = req.params.userId;

      // Validate the user ID
      const checkUser = await User.findById(userId);
      if (!checkUser) {
          return res.status(404).json({ message: 'The user does not exist!' });
      }

      // Find projects owned by the user
      const projects = await ProjectModel.find({ owner_id: userId });
      res.json(projects);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting the projects' });
  }
};

// Get a specific project by ID
const getProjectById = async (req, res) => {
  try {
      const projectId = req.params.projectId;
      const getProjectBasedOnId = await ProjectModel.findById(projectId);

      if (!getProjectBasedOnId) {
          return res.status(404).json({ message: 'Project does not exist!' });
      }
      res.json(getProjectBasedOnId);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting the project' });
  }
};

// Update a project by ID
const updateProjectById = async (req, res) => {
  try {
      const projectId = req.params.projectId;
      // Check if there is info provided or not
      const { name, description, owner_id } = req.body;
      if (!name && !description && !owner_id) {
          return res.status(400).json({ message: 'At least one field is required to update the project' });
      }
      const updateProject = await ProjectModel.findByIdAndUpdate(projectId, req.body, { new: true });

      if (!updateProject) {
          return res.status(400).json({ message: 'Could not update this project, project not found.' });
      }
      res.json(updateProject);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the project' });
  }
};

// Delete a project by ID
const deleteProjectById = async (req, res) => {
  try {
      const projectId = req.params.projectId;
      const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

      if (!deletedProject) {
          return res.status(404).json({ message: 'Could not delete the project, project does not exist' });
      }

      res.status(204).json(); // 204 No Content
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the project' });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};
