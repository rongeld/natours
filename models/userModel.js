const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    trim: true,
    maxLength: [40, 'User name must have less than 40 characters'],
    minLegnth: [1, 'User name must have more than 1 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLegnth: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      message: 'Password does not match',
      validator: function (val) {
        return val === this.password;
      }
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;