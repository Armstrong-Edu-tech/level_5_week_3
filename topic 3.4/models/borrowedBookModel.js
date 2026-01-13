const pool = require("../config/db");

const BorrowedBook = {

  getAll: async () => {
    const result = await pool.query(`
      SELECT 
        BB.borrow_id,
        R.reader_name,
        B.title AS book_title,
        BB.borrow_date,
        BB.return_date
      FROM Borrowed_Books BB
      INNER JOIN Readers R ON BB.reader_id = R.reader_id
      INNER JOIN Books B ON BB.book_id = B.book_id
      ORDER BY BB.borrow_date DESC
    `);
    return result.rows;
  },


  getById: async (id) => {
    const result = await pool.query(
      `SELECT * FROM Borrowed_Books WHERE borrow_id = $1`,
      [id]
    );
    return result.rows[0];
  },


  create: async (borrowData) => {
    const { reader_id, book_id, borrow_date } = borrowData;
    const result = await pool.query(
      "INSERT INTO Borrowed_Books (reader_id, book_id, borrow_date) VALUES ($1, $2, $3) RETURNING *",
      [reader_id, book_id, borrow_date || 'CURRENT_DATE']
    );
    return result.rows[0];
  },


  update: async (id, updateData) => {
    const { return_date } = updateData;
    const result = await pool.query(
      "UPDATE Borrowed_Books SET return_date = $1 WHERE borrow_id = $2 RETURNING *",
      [return_date, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM Borrowed_Books WHERE borrow_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },


  checkBookAvailability: async (book_id) => {
    const result = await pool.query(
      "SELECT book_id, title, is_available FROM Books WHERE book_id = $1",
      [book_id]
    );
    return result.rows[0];
  },

  checkReaderExists: async (reader_id) => {
    const result = await pool.query(
      "SELECT reader_id, reader_name FROM Readers WHERE reader_id = $1",
      [reader_id]
    );
    return result.rows[0];
  },

  borrowBook: async (reader_id, book_id) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const borrowResult = await client.query(
        "INSERT INTO Borrowed_Books (reader_id, book_id, borrow_date) VALUES ($1, $2, CURRENT_DATE) RETURNING *",
        [reader_id, book_id]
      );

      await client.query(
        "UPDATE Books SET is_available = FALSE WHERE book_id = $1",
        [book_id]
      );

      await client.query('COMMIT');
      return borrowResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  returnBook: async (borrow_id) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const borrowRecord = await client.query(
        "SELECT book_id, return_date FROM Borrowed_Books WHERE borrow_id = $1",
        [borrow_id]
      );

      if (borrowRecord.rows.length === 0) {
        throw new Error('Borrow record not found');
      }

      const book_id = borrowRecord.rows[0].book_id;
      const return_date = borrowRecord.rows[0].return_date;

      if (return_date !== null) {
        throw new Error('Book already returned');
      }

      // تحديث return_date
      const returnResult = await client.query(
        "UPDATE Borrowed_Books SET return_date = CURRENT_DATE WHERE borrow_id = $1 RETURNING *",
        [borrow_id]
      );

      await client.query(
        "UPDATE Books SET is_available = TRUE WHERE book_id = $1",
        [book_id]
      );

      await client.query('COMMIT');
      return returnResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM Borrowed_Books WHERE borrow_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

deleteAllReturned: async () => {
  const result = await pool.query(
    "DELETE FROM Borrowed_Books WHERE return_date IS NOT NULL RETURNING *"
  );
  return result.rows;
},

deleteOldReturned: async (days) => {
  const result = await pool.query(
    `DELETE FROM Borrowed_Books 
      WHERE return_date IS NOT NULL 
      AND return_date < CURRENT_DATE - INTERVAL '${days} days'
      RETURNING *`
  );
  return result.rows;
},

}


module.exports = BorrowedBook;