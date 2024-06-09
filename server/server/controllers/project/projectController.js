const Project = require('../../models/projectModel');
const User  = require('../../models/UserModel');


// - POST /api/v1/projects - Create a new project
exports.newProject = async(res, reg)=> {
   try{
    const {name, description, owner_id} = req.body;

    //check if the body is exist
    if(!name || !description || !owner_id){
        return res.status(400).json({message: "fields are required!"});
    }

    const project = new Project({
        name,
        description,
        owner_id
    });
    await project.save();
    res.status(201).json(project);
   }  catch(error){
    res.status(500).json({error: 'error occured while creating the project'});
   }
};


// GET /api/v1/projects - Get all projects for the current user

exports.getAllProjects = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Validate the user ID
      const checkUser = await User.findById(userId);
      if (!checkUser) {
        return res.status(404).json({ message: 'The user does not exist!' });
      }
  
      // Find projects owned by the user
      const projects = await Project.find({ owner_id: userId });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while getting the projects' });
    }
  };


//   GET /api/v1/projects/{projectId} - Get a specific project by ID

exports.getProjectById = async (req, res) => {
    try{
        const projectId = req.params.projectId;
        const getProjectBasedOnId = await Project.findById(projectId);

        if(!getProjectBasedOnId){
            return res.status(404).json({message: 'project does not exist!'});
        }
        res.json(getProjectBasedOnId);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while getting the project '})
    }
};

// PUT /api/v1/projects/{projectId} - Update a project by ID
exports.updateProject = async(req, res)=>{
    try{
        const projectId = req.params.projectId;
        //check if there is info provided or not
        const {name, description, owner_id} = req.body;
        if(!name && !description && !owner_id){
            return res.status(400).json({message: 'At least one field is required to update the project'});
        }
        const updateProject = await Project.findByIdAndUpdate(projectId, req.body, {new: true});

        if (!updateProject){
            return res.status(400).json({message: 'Could not update this project, Project not found.'});
        }
        res.json(updateProject);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while getting the project '})

    }
};

// DELETE /api/v1/projects/{projectId} - Delete a project by ID
exports.deleteProjectById = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const deletedProject = await Project.findByIdAndDelete(projectId);
  
      if (!deletedProject) {
        return res.status(404).json({ message: 'Could not delete the project, project does not exist' });
      }
  
      res.status(204).json(); // 204 No Content
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the project' });
    }
  };