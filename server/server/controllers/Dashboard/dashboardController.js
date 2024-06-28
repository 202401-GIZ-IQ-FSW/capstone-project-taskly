// server\server\controllers\Dashboard\dashboardController.js
const UserModel = require('../../models/UserModel');
const TicketModel = require('../../models/TicketModel');
const ProjectModel = require('../../models/ProjectModel');

const mainPage = async (req, res) => {
  const userId = req.user.id;
  try {
    const ownedProjects = await ProjectModel.find({ ownerId: userId });
    const projectsCanView = await ProjectModel.find({ viewAccess: userId });
    const projectsCanEdite = await ProjectModel.find({ editAccess: userId });
    const projectsEditInvited = await ProjectModel.find({
      editorsInvited: userId,
    });
    const projectsViewInvited = await ProjectModel.find({
      viewersInvited: userId,
    });

    // تجميع التذاكر حسب الحالة
    const ticketStatusCounts = await TicketModel.aggregate([
      { $match: { assignees: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // تحويل النتيجة إلى كائن للحصول على عدد التذاكر حسب الحالة بسهولة
    const ticketCountsByStatus = ticketStatusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const data = {
      ownedProjects,
      projectsCanView,
      projectsCanEdite,
      projectsEditInvited,
      projectsViewInvited,
      ticketCountsByStatus
    };
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  mainPage,
};
