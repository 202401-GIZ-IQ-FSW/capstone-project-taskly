const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notification/notificationController');

  
 
router.get('/', notificationController.getAllNotifications);
router.put('/:notificationId', notificationController.NotificationIsRead);


module.exports = router;
