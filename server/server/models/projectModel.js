// example for project model!


const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    ownerId :{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: { type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now}
});

// Middleware to update `updated_at` on each save
projectSchema.pre('save', function(next){
    this.updated_at = Date.now();
    next();
});
  const Project = mongoose.model('Project', projectSchema);
  module.exports = Project;
