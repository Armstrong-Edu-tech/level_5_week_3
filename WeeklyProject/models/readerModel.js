const pool = require("../config/db");

const Reader = {
  // جلب كل القراء
  getAll: async () => {
    const result = await pool.query("SELECT * FROM Readers");
    return result.rows;
  },

  // جلب قارئ واحد بالـ ID
  getById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM Readers WHERE reader_id = $1",
      [id]
    );
    return result.rows[0];
  },

  // إضافة قارئ جديد
  create: async (readerData) => {
    const { reader_name, email, membership_date } = readerData;
    const result = await pool.query(
      "INSERT INTO Readers (reader_name, email, membership_date) VALUES ($1, $2, $3) RETURNING *",
      [reader_name, email, membership_date]
    );
    return result.rows[0];
  },

  // تعديل قارئ
  update: async (id, readerData) => {
    const { reader_name, email } = readerData;
    const result = await pool.query(
      "UPDATE Readers SET reader_name = $1, email = $2 WHERE reader_id = $3 RETURNING *",
      [reader_name, email, id]
    );
    return result.rows[0];
  },

  // حذف قارئ
  delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM Readers WHERE reader_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Reader;