const mongoose = require('mongoose');

module.exports.User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minLength: 5,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  age: {
    type: Number,
    required: true
  }
});