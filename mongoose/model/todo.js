const mongoose = require('mongoose');

module.exports.Todo = mongoose.model('Todo', {
  task: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});