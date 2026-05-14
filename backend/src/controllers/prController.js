const PullRequest = require('../models/PullRequest');
const AIReview = require('../models/AIReview');
const Repository = require('../models/Repository');

const getPullRequests = async (req, res) => {
  try {
    const prs = await PullRequest.find()
      .populate('repositoryId', 'repoName owner')
      .sort({ createdAt: -1 });
      
    // Fetch latest review for each PR to include severity/score
    const prsWithReviews = await Promise.all(prs.map(async (pr) => {
      const review = await AIReview.findOne({ prId: pr._id }).sort({ reviewedAt: -1 });
      return {
        ...pr.toObject(),
        latestReview: review ? { severity: review.severity, score: review.score } : null
      };
    }));

    res.json(prsWithReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pull requests' });
  }
};

const getPullRequestById = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id)
      .populate('repositoryId');
    if (!pr) return res.status(404).json({ error: 'PR not found' });
    res.json(pr);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PR' });
  }
};

const getReviewByPrId = async (req, res) => {
  try {
    const reviews = await AIReview.find({ prId: req.params.id }).sort({ reviewedAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalPrs = await PullRequest.countDocuments();
    
    // Aggregate severity counts
    const severityDistribution = await AIReview.aggregate([
      {
        $group: {
          _id: "$prId", // Group by PR ID to get latest review per PR
          latestSeverity: { $last: "$severity" }
        }
      },
      {
        $group: {
          _id: "$latestSeverity",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Count reviewed PRs (unique PRs that have at least one review)
    const reviewedPrsList = await AIReview.distinct('prId');
    const reviewedPrs = reviewedPrsList.length;
    
    const pendingPrs = totalPrs > reviewedPrs ? totalPrs - reviewedPrs : 0;

    const stats = {
      totalPrs,
      reviewedPrs,
      pendingPrs,
      severityDistribution: severityDistribution.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 })
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

module.exports = {
  getPullRequests,
  getPullRequestById,
  getReviewByPrId,
  getDashboardStats
};
