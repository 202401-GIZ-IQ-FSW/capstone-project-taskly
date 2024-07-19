// server\server\models\ProjectModel.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    editorsInvited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    viewersInvited : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    editAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    viewAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
projectSchema.pre('find', function (next) {
  this.populate('ownerId','username') 
  next();
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
