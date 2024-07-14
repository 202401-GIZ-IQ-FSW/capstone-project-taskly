const io = require('../../index');
const NotificationModel = require('../../models/NotificationModel');

// - GET /api/v1/notifications - Get all notifications for the current user
const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const allNotifications = await NotificationModel.find({ userId }).sort({
      createdAt: -1,
    });
    if (!allNotifications) {
      res
        .status(401)
        .json({ message: 'Notifications for this user not found' });
      return;
    }
    res.json(allNotifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error getting Notifications', error: error.message });
  }
};

// - PUT /api/v1/notifications/{notificationId} - Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const updateNotification = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!updateNotification) {
      res.status(401).json({ message: 'Notification cannot be updated' });
      return;
    }
    res.json(updateNotification);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating Notifications', error: error.message });
  }
};

// - POST /api/v1/projects/{projectId}/tickets/{ticketId}/notify - Trigger a notification for an action on a ticket
const triggerNotificationsOnTicketActions = async (req, res) => {
  try {
    const { projectId, ticketId } = req.params;
    const { userId, message } = req.body;
    const notification = new NotificationModel({
      userId,
      message: `Ticket ${ticketId} in project ${projectId} message: ${message}`,
    });
    await notification.save();
    io.emit('notification', notification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: 'Error Triggering Notifications',
      error: error.message,
    });
  }
};

// - POST /api/v1/projects/{projectId}/notify - Trigger a notification for an action on a project
const triggerNotificationsOnProjectActions = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, message } = req.body;
    const notification = new NotificationModel({
      userId,
      message: `Project ${projectId}: ${message}`,
    });
    await notification.save();
    io.emit('notification', notification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: 'Error Triggering Notifications',
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotifications,
  markNotificationAsRead,
  triggerNotificationsOnTicketActions,
  triggerNotificationsOnProjectActions,
};
