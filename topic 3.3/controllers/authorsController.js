const Author = require("../models/authorModel");

// جلب كل المؤلفين
exports.getAllAuthors = async (req, res) => {
    try {
    const authors = await Author.getAll();
    
    res.json({
        success: true,
        count: authors.length,
        data: authors
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching authors",
        error: error.message
    });
    }
};
exports.getAuthorById = async (req, res) => {
    try {
    const { id } = req.params;
    const author = await Author.getById(id);
    
    if (!author) {
        return res.status(404).json({
        success: false,
        message: "Author not found"
        });
    }
    
    res.json({
        success: true,
        data: author
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching author",
        error: error.message
    });
    }
};
exports.addAuthor = async (req, res) => {
    try {
    const authorData = req.body;
    const newAuthor = await Author.create(authorData);
    
    res.status(201).json({
        success: true,
        message: "Author added successfully",
        data: newAuthor
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error adding author",
        error: error.message
    });
    }
};
exports.updateAuthor = async (req, res) => {
    try {
    const { id } = req.params;
    const authorData = req.body;
    const updatedAuthor = await Author.update(id, authorData);
    
    if (!updatedAuthor) {
        return res.status(404).json({
        success: false,
        message: "Author not found"
        });
    }
    
    res.json({
        success: true,
        message: "Author updated successfully",
        data: updatedAuthor
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error updating author",
        error: error.message
    });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedAuthor = await Author.delete(id);
    
    if (!deletedAuthor) {
        return res.status(404).json({
        success: false,
        message: "Author not found"
        });
    }
    
    res.json({
        success: true,
        message: "Author deleted successfully"
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error deleting author",
        error: error.message
    });
    }
};