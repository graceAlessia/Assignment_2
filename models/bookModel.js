const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookID: {
    type: Number,
    required: true,
  },
  author: String,
  bookTitle: String,
  year: Number,
  genre: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
