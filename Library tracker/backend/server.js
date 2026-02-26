require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const loanRoutes = require('./routes/loans');

app.use('/myLibrary/books', bookRoutes);
app.use('/myLibrary/users', userRoutes);
app.use('/myLibrary/loans', loanRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () =>
      console.log(`Server now running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
