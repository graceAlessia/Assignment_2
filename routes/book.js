var express = require("express");
var router = express.Router();
const Book = require("../models/bookModel");
const bookController = require("../controllers/bookController");
var books = [];

router.get("/", bookController.getBookList);

router.post("/", bookController.addNewBook);

router.get("/:id", bookController.searchBook);

router.delete("/:id", bookController.deleteBook);

router.put("/:id", bookController.updateBook);

module.exports = router;
