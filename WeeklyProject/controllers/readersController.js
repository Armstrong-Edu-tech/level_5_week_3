const Reader = require("../models/readerModel");

// جلب كل القراء
exports.getAllReaders = async (req, res) => {
    try {
    const readers = await Reader.getAll();
    
    res.json({
        success: true,
        count: readers.length,
        data: readers
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching readers",
        error: error.message
    });
    }
};

// جلب قارئ واحد
exports.getReaderById = async (req, res) => {
    try {
    const { id } = req.params;
    const reader = await Reader.getById(id);
    
    if (!reader) {
        return res.status(404).json({
        success: false,
        message: "Reader not found"
        });
    }
    
    res.json({
        success: true,
        data: reader
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching reader",
        error: error.message
    });
    }
};

// إضافة قارئ جديد
exports.addReader = async (req, res) => {
    try {
    const readerData = req.body;
    const newReader = await Reader.create(readerData);
    
    res.status(201).json({
        success: true,
        message: "Reader added successfully",
        data: newReader
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error adding reader",
        error: error.message
    });
    }
};

// تعديل قارئ
exports.updateReader = async (req, res) => {
    try {
    const { id } = req.params;
    const readerData = req.body;
    const updatedReader = await Reader.update(id, readerData);
    
    if (!updatedReader) {
        return res.status(404).json({
        success: false,
        message: "Reader not found"
        });
    }
    
    res.json({
        success: true,
        message: "Reader updated successfully",
        data: updatedReader
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error updating reader",
        error: error.message
    });
    }
};

// حذف قارئ
exports.deleteReader = async(req, res) => {
try {
const { id } = req.params;
const deletedReader = await Reader.delete(id);
if (!deletedReader) {
    return res.status(404).json({
    success: false,
    message: "Reader not found"
    });
}

res.json({
    success: true,
    message: "Reader deleted successfully"
});
} catch (error) {
res.status(500).json({
success: false,
message: "Error deleting reader",
error: error.message
});
}
};