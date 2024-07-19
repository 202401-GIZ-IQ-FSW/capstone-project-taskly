const express = require('express');
const UserModel = require('../../models/UserModel');
const ProjectModel = require('../../models/ProjectModel');
const mongoose = require('mongoose');

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { invite } = req.query;
    const projectId = req.query.id;
    if (invite && projectId) {
      // console.log(invite, projectId);
      const project = await ProjectModel.findById(projectId);
      let ids = [
        project.ownerId,
        project.editorsInvited,
        project.viewersInvited,
        project.editAccess,
        project.viewAccess,
      ];
      ids = ids.flat();
      const excludedObjectIds = ids.map((id) => mongoose.Types.ObjectId(id));
      // console.log(excludedObjectIds);
      const users = await UserModel.find({ _id: { $nin: excludedObjectIds } });
      return res.status(200).json(users);
    } else return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/invite', async (req, res) => {
  try {
    const { id, role } = req.body;
    const projectId = req.query.id;

    if (role && id) {
      const project = await ProjectModel.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Utility function to remove an item from an array
      const removeFromArray = (array, item) => {
        const index = array.indexOf(item);
        if (index > -1) {
          array.splice(index, 1);
        }
      };

      if (role === 'edit') {
        if (project.editorsInvited.includes(id)) {
          removeFromArray(project.editorsInvited, id);
        } else if (project.viewersInvited.includes(id)) {
          removeFromArray(project.viewersInvited, id);
          project.editorsInvited.push(id);
        } else {
          project.editorsInvited.push(id);
        }
      }

      if (role === 'view') {
        if (project.viewersInvited.includes(id)) {
          removeFromArray(project.viewersInvited, id);
        } else if (project.editorsInvited.includes(id)) {
          removeFromArray(project.editorsInvited, id);
          project.viewersInvited.push(id);
        } else {
          project.viewersInvited.push(id);
        }
      }

      if (role === 'accept') {
        if (project.viewersInvited.includes(id)) {
          removeFromArray(project.viewersInvited, id);
          project.viewAccess.push(id);
        } else if (project.editorsInvited.includes(id)) {
          removeFromArray(project.editorsInvited, id);
          project.editAccess.push(id);
        }
      }

      if (role === 'delete') {
        removeFromArray(project.viewAccess, id);
        removeFromArray(project.editAccess, id);
      }

      await project.save();
      return res.status(200).json({ message: 'Invite updated successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid request' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
