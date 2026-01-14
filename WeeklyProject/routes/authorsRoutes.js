const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/AuthorsController");

router.get("/", authorsController.getAllAuthors);
router.get("/:id", authorsController.getAuthorById);
router.post("/", authorsController.addAuthor);
router.put("/:id", authorsController.updateAuthor);
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;