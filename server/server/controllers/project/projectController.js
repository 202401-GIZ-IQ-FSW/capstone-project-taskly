const ProjectModel = require('../../models/ProjectModel');
const UserModel = require('../../models/UserModel');

const createProject = async (req, res) => {
  const { name, description } = req.body;
  const ownerId = req.user.id; // Use the owner ID of the logged in user

  try {
    if (!name || !description) {
      return res.status(400).json({ message: 'Project name and description are required!' });
    }

    const project = await ProjectModel.create({
      name,
      description,
      ownerId,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the project', message: error.message });
  }
};

// Get all projects for the current user
const getAllProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    // Validate the user ID
    const checkUser = await UserModel.findById(userId);
    if (!checkUser) {
      return res.status(404).json({ message: 'You have to be logged in to view your projects' });
    }

    // Find projects owned by the user
    const projects = await ProjectModel.find({ ownderId: userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the projects', message: error.message });
  }
};

const getSingleProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project does not exist!' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the project', message: error.message });
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { name, description } = req.body;

  if (!name && !description) {
    return res
      .status(400)
      .json({ message: 'please provide a new name or description to update the project' });
  }

  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(projectId, req.body, { new: true });

    if (!updateProject) {
      return res.status(400).json({ message: 'project not found.' });
    }
    res.json(updateProject);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the project', message: error.message });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project does not exist' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the project', message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};