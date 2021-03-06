const express = require('express');

const {
  getAllUsers,
  updateMe,
  deleteMe,
  deleteUser
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictedTo
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMe', protect, updateMe);

router.patch('/updateMyPassword', protect, updatePassword);

router.delete('/deleteMe', protect, deleteMe);

router.route('/').get(getAllUsers);

router.route('/:id').delete(protect, restrictedTo('admin'), deleteUser);

module.exports = router;
