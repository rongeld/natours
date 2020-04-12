const express = require('express');

const {
    getAllUsers
} = require('../controllers/userController');
const {
    signup
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);

router.route('/').get(getAllUsers);

module.exports = router;