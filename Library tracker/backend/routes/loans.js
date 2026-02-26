const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');


// ===============================
// RENT A BOOK
// ===============================
router.post('/rent/:bookId', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.copies <= 0) {
      return res.status(400).json({ message: "No copies available" });
    }

    // Check if user already has an active loan for this book
    const existingLoan = await Loan.findOne({
        bookId: book._id,
        userId: req.user.id,
        returnedAt: null
    });

    if (existingLoan) {
        return res.status(400).json({
        message: "You already have this book rented"
    });
    }

    const activeLoansCount = await Loan.countDocuments({
        userId: req.user.id,
        returnedAt: null
    });

    if (activeLoansCount >= 3) {
        return res.status(400).json({
        message: "You have reached the maximum number of active loans"
    });
    }


    const loan = new Loan({
      bookId: book._id,
      userId: req.user.id,
      rentedAt: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
    });

    await loan.save();

    // decrease available copies
    book.copies -= 1;
    await book.save();

    res.status(201).json({
      message: "Book rented successfully",
      loan
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// RETURN A BOOK
// ===============================
router.put('/return/:loanId', authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.returnedAt) {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Only the user who rented it can return it (or admin)
    if (loan.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    loan.returnedAt = new Date();
    await loan.save();

    // increase book copies
    const book = await Book.findById(loan.bookId);
    book.copies += 1;
    await book.save();

    res.json({
      message: "Book returned successfully",
      loan
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// GET MY LOANS
// ===============================
router.get('/my-loans', authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id })
      .populate('bookId', 'title author isbn');

    res.json(loans);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// GET ALL LOANS (ADMIN ONLY)
// ===============================
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('bookId', 'title')
      .populate('userId', 'name email');

    res.json(loans);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// GET OVERDUE LOANS (ADMIN ONLY)
// ===============================
router.get('/overdue', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const overdueLoans = await Loan.find({
      returnedAt: null,
      dueDate: { $lt: new Date() }
    })
      .populate('bookId', 'title')
      .populate('userId', 'name email');

    res.json(overdueLoans);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
