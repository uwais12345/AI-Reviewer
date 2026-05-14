const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  repoName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Repository', repositorySchema);
