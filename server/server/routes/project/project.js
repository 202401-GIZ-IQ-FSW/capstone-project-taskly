const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../../middleware/validateObjectId');
const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} = require('../../controllers/project/projectController');

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:projectId', validateObjectId('projectId'), getSingleProject);
router.put('/:projectId', validateObjectId('projectId'), updateProject);
router.delete('/:projectId', validateObjectId('projectId'), deleteProject);

// - **Trigger Notification**

const notificationController = require('../../controllers/notification/notificationController');

router.post('/:projectId/tickets/:ticketId/notify', notificationController.NotificationTicket);
router.post('/:projectId/notify', notificationController.NotificationProject);

module.exports = router;
