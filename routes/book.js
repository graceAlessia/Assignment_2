var express = require("express");
var router = express.Router();

var books = [];

router.get("/", function (req, res, next) {
  res.status(200);
  res.json({
    message: "Book List",
    result: books,
  });
});

router.post("/", function (req, res) {
  const newItem = { id: Date.now(), ...req.body };
  books.push(newItem);
  res.status(201);
  res.json({
    message: "New Book added successfully",
    result: newItem,
  });
});

router.get("/:id", function (req, res) {
  const item = books.find((i) => i.id === req.params.id);
  if (!item) {
    //to respond not exist
    res.status(400);
    res.json({
      message: "Book not found!",
      result: [],
    });
  }
  res.status(200);
  res.json({
    message: "Book found!",
    result: item,
  });
});

// Delete a book by ID
router.delete("/:id", function (req, res) {
  const index = books.findIndex((i) => i.id === parseInt(req.params.id)); // Find the index
  if (index === -1) {
    // Check if the index is invalid
    res.status(404).json({
      message: "Book does not exist!",
    });
    return; // Ensure we don't proceed further
  }
  books.splice(index, 1); // Remove the item from the array
  res.status(200).json({
    message: "Successfully deleted!",
  });
});

router.put("/:id", function (req, res) {
  const item = books.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).json({
      message: "Book does not exist!",
    });
    return; // Stop further execution if the book does not exist
  }

  // Update the book properties
  item.author = req.body.author || item.author;
  item.year = req.body.year || item.year;
  item.genre = req.body.genre || item.genre;

  res.status(200).json({
    message: "Book edited successfully!",
    result: item, // Include the updated book in the response
  });
});

module.exports = router;
