const BorrowedBook = require("../models/borrowedBookModel");
const Book = require("../models/bookModel");

exports.getAllBorrowedBooks = async (req, res) => {
    try {
    const borrowedBooks = await BorrowedBook.getAll();
    
    res.json({
        success: true,
        count: borrowedBooks.length,
        data: borrowedBooks
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching borrowed books",
        error: error.message
    });
    }
};

exports.getBorrowedBookById = async (req, res) => {
    try {
    const { id } = req.params;
    const borrowedBook = await BorrowedBook.getById(id);
    
    if (!borrowedBook) {
        return res.status(404).json({
        success: false,
        message: "Borrowed book record not found"
        });
    }
    
    res.json({
        success: true,
        data: borrowedBook
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching borrowed book",
        error: error.message
    });
    }
};

exports.addBorrowedBook = async (req, res) => {
    try {
    const borrowData = req.body;
    const newBorrow = await BorrowedBook.create(borrowData);
    
    res.status(201).json({
        success: true,
        message: "Borrow record added successfully",  // ← غيرنا
        data: newBorrow
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error adding borrow record",  // ← غيرنا
        error: error.message
    });
    }
};

exports.updateBorrowedBook = async (req, res) => {
    try {
    const { id } = req.params;
    const { return_date } = req.body;
    
    const updatedBorrow = await BorrowedBook.update(id, return_date);
    
    if (!updatedBorrow) {
        return res.status(404).json({
        success: false,
        message: "Borrowed book record not found"
        });
    }
    
    res.json({
        success: true,
        message: "Borrow record updated successfully",  
        data: updatedBorrow
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error updating borrow record",  
        error: error.message
    });
    }
};

exports.deleteBorrowedBook = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedBorrow = await BorrowedBook.delete(id);
    
    if (!deletedBorrow) {
        return res.status(404).json({
        success: false,
        message: "Borrowed book record not found"
        });
    }
    
    res.json({
        success: true,
        message: "Borrowed book record deleted successfully"
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error deleting borrowed book record",
        error: error.message
    });
    }
};

exports.borrowBook = async (req, res) => {
    try {
    const { reader_id, book_id } = req.body;
    const reader = await BorrowedBook.checkReaderExists(reader_id);
    if (!reader) {
        return res.status(404).json({
        success: false,
        message: "Reader not found"
        });
    }
    const book = await BorrowedBook.checkBookAvailability(book_id);
    if (!book) {
        return res.status(404).json({
        success: false,
        message: "Book not found"
        });
    }
    if (!book.is_available) {
        return res.status(400).json({
        success: false,
        message: "Book is not available, already borrowed"
        });
    }
    const borrowRecord = await BorrowedBook.borrowBook(reader_id, book_id);

    res.status(201).json({
        success: true,
        message: `Book "${book.title}" borrowed successfully by ${reader.reader_name}`,
        data: {
        borrow_id: borrowRecord.borrow_id,
        reader_name: reader.reader_name,
        book_title: book.title,
        borrow_date: borrowRecord.borrow_date
        }
   });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error borrowing book",
        error: error.message
    });
    }
};

// إرجاع كتاب )
exports.returnBook = async (req, res) => {
    try {
    const { borrow_id } = req.body;
    const returnRecord = await BorrowedBook.returnBook(borrow_id);
    const fullDetails = await BorrowedBook.getById(borrow_id);
    res.json({
        success: true,
        message: "Book returned successfully",
        data: {
        borrow_id: returnRecord.borrow_id,
        reader_name: fullDetails.reader_name,
        book_title: fullDetails.book_title,
        borrow_date: returnRecord.borrow_date,
        return_date: returnRecord.return_date
        }
    });
    } catch (error) {
    if (error.message === 'Borrow record not found') {
        return res.status(404).json({
        success: false,
        message: "Borrow record not found"
        });
    }
    if (error.message === 'Book already returned') {
        return res.status(400).json({
        success: false,
        message: "Book already returned"
        });
    }

    res.status(500).json({
        success: false,
        message: "Error returning book",
        error: error.message
    });
    }
};

// حذف سجل استعارة
exports.deleteBorrowedBook = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedBorrow = await BorrowedBook.delete(id);
    
    if (!deletedBorrow) {
        return res.status(404).json({
        success: false,
        message: "Borrowed book record not found"
        });
    }
    
    res.json({
        success: true,
        message: "Borrowed book record deleted successfully"
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error deleting borrowed book record",
        error: error.message
    });
    }
};

// حذف كل السجلات المرجوعة
exports.deleteAllReturnedBooks = async (req, res) => {
    try {
    const deletedRecords = await BorrowedBook.deleteAllReturned();
    
    res.json({
        success: true,
        message: `Deleted ${deletedRecords.length} returned book records`,
        count: deletedRecords.length
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error deleting returned records",
        error: error.message
    });
    }
};

// حذف السجلات القديمة
exports.deleteOldReturnedBooks = async (req, res) => {
    try {
    const { days } = req.query; // ناخد الرقم من Query Parameter
    
    if (!days || days <= 0) {
        return res.status(400).json({
        success: false,
        message: "Please provide valid number of days"
        });
    }
    const deletedRecords = await BorrowedBook.deleteOldReturned(days);
    
    res.json({
        success: true,
        message: `Deleted ${deletedRecords.length} old records (older than ${days} days)`,
        count: deletedRecords.length,
        days: days
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error deleting old records",
        error: error.message
    });
    }
};



// عرض الكتب المتاحة باستخدام is_available



