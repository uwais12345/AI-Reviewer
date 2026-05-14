const Repository = require('../models/Repository');
const PullRequest = require('../models/PullRequest');
const AIReview = require('../models/AIReview');
const ReviewHistory = require('../models/ReviewHistory');
const githubService = require('../services/githubService');
const aiReviewService = require('../services/aiReviewService');
const crypto = require('crypto');

// Middleware to verify GitHub webhook signature
const verifySignature = (req) => {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature && process.env.GITHUB_WEBHOOK_SECRET) {
    return false;
  }
  if (!process.env.GITHUB_WEBHOOK_SECRET) return true; // Skip if no secret configured

  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
  // Reconstruct the raw body string to verify
  const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
};

const handleWebhook = async (req, res) => {
  try {
    // Optionally verify signature
    // if (!verifySignature(req)) {
    //  return res.status(401).json({ error: 'Invalid signature' });
    // }

    const event = req.headers['x-github-event'];
    
    // Respond to GitHub quickly to avoid timeout
    res.status(202).json({ message: 'Webhook received and processing started' });

    if (event === 'ping') {
      console.log('Ping event received');
      return;
    }

    if (event !== 'pull_request') {
      return;
    }

    const payload = req.body;
    const action = payload.action;

    // We only care about opened, synchronize, and reopened
    if (!['opened', 'synchronize', 'reopened'].includes(action)) {
      return;
    }

    const { pull_request: pr, repository: repo } = payload;
    
    // 1. Upsert Repository
    let repository = await Repository.findOne({ githubUrl: repo.html_url });
    if (!repository) {
      repository = new Repository({
        repoName: repo.name,
        owner: repo.owner.login,
        githubUrl: repo.html_url
      });
      await repository.save();
    }

    // 2. Upsert Pull Request
    let pullRequest = await PullRequest.findOne({ repositoryId: repository._id, prNumber: pr.number });
    if (!pullRequest) {
      pullRequest = new PullRequest({
        repositoryId: repository._id,
        prNumber: pr.number,
        title: pr.title,
        author: pr.user.login,
        status: action === 'closed' ? 'closed' : 'opened',
        githubUrl: pr.html_url
      });
    } else {
      pullRequest.status = action === 'closed' ? 'closed' : 'opened';
      pullRequest.title = pr.title;
    }
    await pullRequest.save();

    // 3. Log History
    await ReviewHistory.create({
      prId: pullRequest._id,
      action: `pr_${action}`
    });

    // 4. Fetch PR Diff
    const diff = await githubService.getPullRequestDiff(repo.owner.login, repo.name, pr.number);
    
    if (!diff || diff.length === 0) {
      console.log("No diff found or diff too large.");
      return;
    }

    // 5. Generate AI Review
    console.log(`Generating AI review for PR #${pr.number}...`);
    const aiResponse = await aiReviewService.generateAIReview(diff);

    // 6. Save AI Review
    const aiReview = new AIReview({
      prId: pullRequest._id,
      summary: aiResponse.summary,
      severity: aiResponse.severity,
      score: aiResponse.score,
      suggestions: aiResponse.suggestions
    });
    await aiReview.save();

    // 7. Log AI Review History
    await ReviewHistory.create({
      prId: pullRequest._id,
      action: 'ai_reviewed'
    });

    console.log(`Successfully reviewed PR #${pr.number} in ${repo.full_name}`);

  } catch (error) {
    console.error('Webhook processing error:', error);
  }
};

module.exports = {
  handleWebhook,
};
