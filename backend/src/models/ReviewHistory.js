const mongoose = require('mongoose');

const reviewHistorySchema = new mongoose.Schema({
  prId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PullRequest',
    required: true,
  },
  action: {
    type: String,
    required: true, // e.g., 'created', 'updated', 'ai_reviewed'
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ReviewHistory', reviewHistorySchema);
