const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message
    });
  }
};
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.getById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await Book.create(bookData);
    
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book",
      error: error.message
    });
  }
};

// 4️⃣ تعديل كتاب
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookData = req.body;
    const updatedBook = await Book.update(id, bookData);
    
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    
    res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error.message
    });
  }
};

// 5️⃣ حذف كتاب
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.delete(id);
    
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    
    res.json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error.message
    });
  }
};

exports.getAvailableBooks = async (req, res) => {
  try {
    const availableBooks = await Book.getAvailableBooksNotIn();
    
    res.json({
      success: true,
      count: availableBooks.length,
      message: `Found ${availableBooks.length} available books`,
      data: availableBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available books",
      error: error.message
    });
  }
};
exports.getAvailableBooksByStatus = async (req, res) => {
  try {
    const availableBooks = await Book.getAvailableBooksByStatus();
    
    res.json({
      success: true,
      count: availableBooks.length,
      message: `Found ${availableBooks.length} available books`,
      data: availableBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available books",
      error: error.message
    });
  }
};