const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authenticated");
const {
  list_books,
  create_books,
  update_book,
  retrive_book,
  delete_book,
} = require("../controllers/books");

router.get("/books", authMiddleware, list_books);
router.get("/books/create", authMiddleware, create_books);
router.get("/books/update/:id", authMiddleware, update_book);
router.get("/books/retrive/:id", authMiddleware, retrive_book);
router.get("/books/delete/:id", authMiddleware, delete_book);
