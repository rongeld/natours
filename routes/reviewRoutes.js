const express = require('express');
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview
} = require('../controllers/reviewController');

const { protect } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getAllReviews)
  .post(createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(deleteReview);

module.exports = router;
