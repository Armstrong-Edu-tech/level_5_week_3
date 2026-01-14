const express = require("express");
const router = express.Router();
const borrowedBooksController = require("../controllers/borrowedBooksController");

router.get("/", borrowedBooksController.getAllBorrowedBooks);
router.get("/:id", borrowedBooksController.getBorrowedBookById);
router.post("/", borrowedBooksController.addBorrowedBook);
router.put("/:id", borrowedBooksController.updateBorrowedBook);
router.delete("/:id", borrowedBooksController.deleteBorrowedBook);


router.post("/borrow", borrowedBooksController.borrowBook);
router.post("/return", borrowedBooksController.returnBook);

// Routes جديدة للـ Cleanup
router.delete("/cleanup/all-returned", borrowedBooksController.deleteAllReturnedBooks);
router.delete("/cleanup/old-returned", borrowedBooksController.deleteOldReturnedBooks);


module.exports = router;