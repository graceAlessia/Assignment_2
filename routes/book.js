var express = require("express");
var router = express.Router();
const Book = require("../models/bookModel");

var books = [];

//Book List
router.get("/", async function (req, res, next) {
  const items = await Book.find();
  res.status(200);
  res.json({
    message: "Book List",
    result: items,
  });
});

//Add New Books
router.post("/", async function (req, res) {
  const newItem = { id: Date.now(), ...req.body };

  const book = new Book(newItem);
  try {
    book.save();

    res.status(201).json({
      message: "New Book added successfully!",
      result: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add new book.",
      result: [],
    });
  }
});

//Search Books
router.get("/:id", async function (req, res) {
  const itemID = parseInt(req.params.id);
  const item = await Book.findOne({
    bookID: itemID, // Use bookID to match schema
  });
  if (!item) {
    res.status(400).json({
      message: "Book not found!",
      result: [],
    });
    return;
  }
  res.status(200).json({
    message: "Book found!",
    result: item,
  });
});

// Delete a book by ID
router.delete("/:id", async function (req, res) {
  const itemID = parseInt(req.params.id);

  try {
    const result = await Book.deleteOne({ bookID: itemID });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Book does not exist!",
      });
    }
    res.status(200).json({
      message: "Successfully deleted!",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the book.",
    });
  }
});

// Update Book details
router.put("/:id", async function (req, res) {
  const itemID = parseInt(req.params.id); // Parse the bookID to a number

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { bookID: itemID }, // Match based on bookID
      {
        $set: {
          author: req.body.author,
          bookTitle: req.body.bookTitle,
          year: req.body.year,
          genre: req.body.genre,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found!",
      });
    }

    res.status(200).json({
      message: "Book updated successfully!",
      result: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the book.",
      error: error.message,
    });
  }
});

module.exports = router;
