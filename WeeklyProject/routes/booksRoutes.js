const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.addBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);


// Routes جديدة للكتب المتاحة
router.get("/available/not-in", booksController.getAvailableBooks);
router.get("/available/by-status", booksController.getAvailableBooksByStatus);


module.exports = router;