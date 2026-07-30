const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  technologies: {
    type: [String],
    required: [true, 'Please add technologies used'],
  },
  github: {
    type: String,
    default: '',
  },
  liveDemo: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
