const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  topToursMiddleware,
  getTourStats,
  getMonthlyPlan
} = require('../controllers/tourController');

const { protect, restrictedTo } = require('../controllers/authController');

const router = express.Router();

router.route('/top-5-tours').get(topToursMiddleware, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(protect, getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictedTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
