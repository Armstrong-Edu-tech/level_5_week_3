const express = require("express");
const router = express.Router();
const readersController = require("../controllers/readersController");

router.get("/", readersController.getAllReaders);
router.get("/:id", readersController.getReaderById);
router.post("/", readersController.addReader);
router.put("/:id", readersController.updateReader);
router.delete("/:id", readersController.deleteReader);

module.exports = router;