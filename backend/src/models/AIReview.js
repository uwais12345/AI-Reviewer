const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  file: String,
  issue: String,
  severity: String,
  fix: String,
});

const aiReviewSchema = new mongoose.Schema({
  prId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PullRequest',
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  suggestions: [suggestionSchema],
  reviewedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AIReview', aiReviewSchema);
