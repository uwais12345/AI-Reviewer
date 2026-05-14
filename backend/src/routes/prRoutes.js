const express = require('express');
const router = express.Router();
const prController = require('../controllers/prController');

router.get('/pull-requests', prController.getPullRequests);
router.get('/pull-requests/:id', prController.getPullRequestById);
router.get('/reviews/:id', prController.getReviewByPrId);
router.get('/dashboard/stats', prController.getDashboardStats);

module.exports = router;
