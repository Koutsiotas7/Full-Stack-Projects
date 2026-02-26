const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  copies: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update updatedAt on save
bookSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
