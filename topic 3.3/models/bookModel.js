const pool = require("../config/db");
const Book = {
    getAll: async () => {
    const result = await pool.query("SELECT * FROM Books");
    return result.rows;
    },
    getById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM Books WHERE book_id = $1",
        [id]
    );
    return result.rows[0];
    },
    create: async (bookData) => {
    const { title, author_id, category, publication_year } = bookData;
    const result = await pool.query(
      "INSERT INTO Books (title, author_id, category, publication_year) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, author_id, category, publication_year]
    );
    return result.rows[0];
    },
    update: async (id, bookData) => {
    const { title, category, publication_year } = bookData;
    const result = await pool.query(
      "UPDATE Books SET title = $1, category = $2, publication_year = $3 WHERE book_id = $4 RETURNING *",
        [title, category, publication_year, id]
    );
    return result.rows[0];
    },
    delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM Books WHERE book_id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
    },

    getAvailableBooksNotIn: async () => {
    const result = await pool.query(`
      SELECT 
        B.book_id,
        B.title,
        A.author_name,
        B.category,
        B.publication_year
      FROM Books B
      INNER JOIN Authors A ON B.author_id = A.author_id
      WHERE B.book_id NOT IN (
        SELECT book_id 
        FROM Borrowed_Books 
        WHERE return_date IS NULL
      )
      ORDER BY B.title
    `);
    return result.rows;
  },

  // طريقة 2: باستخدام is_available
  getAvailableBooksByStatus: async () => {
    const result = await pool.query(`
      SELECT 
        B.book_id,
        B.title,
        A.author_name,
        B.category,
        B.publication_year
      FROM Books B
      INNER JOIN Authors A ON B.author_id = A.author_id
      WHERE B.is_available = TRUE
      ORDER BY B.title
    `);
    return result.rows;
  }

};

module.exports = Book;