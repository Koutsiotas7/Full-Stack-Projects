const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const { authMiddleware, adminMiddleware } = require('../middleware/auth');


/*
========================
GET ALL BOOKS
Supports:
- Pagination (?page=1&limit=5)
- Filtering (?author=martin&title=code)
- Sorting (?sort=title or ?sort=-createdAt)
========================
*/
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' };
    }

    const sortBy = req.query.sort || '-createdAt';

    const total = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books
    });

  } catch (err) {
    next(err);
  }
});


/*
========================
GET SINGLE BOOK
========================
*/
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);

  } catch (err) {
    next(err);
  }
});


/*
========================
CREATE BOOK (Admin Only)
========================
*/
router.post('/', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const { title, isbn, author, copies } = req.body;

    const book = new Book({
      title,
      isbn,
      author,
      copies
    });

    const newBook = await book.save();
    res.status(201).json(newBook);

  } catch (err) {
    next(err);
  }
});


/*
========================
UPDATE BOOK (Admin Only)
========================
*/
router.put('/:id', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);

  } catch (err) {
    next(err);
  }
});


/*
========================
DELETE BOOK (Admin Only)
========================
*/
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });

  } catch (err) {
    next(err);
  }
});


module.exports = router;
