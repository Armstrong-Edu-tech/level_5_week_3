const pool = require("../config/db");

const Author = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM Authors");
    return result.rows;
  },
  getById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM Authors WHERE author_id = $1",
      [id]
    );
    return result.rows[0];
  },
  create: async (authorData) => {
    const { author_name, country } = authorData;
    const result = await pool.query(
      "INSERT INTO Authors (author_name, country) VALUES ($1, $2) RETURNING *",
      [author_name, country]
    );
    return result.rows[0];
  },
  update: async (id, authorData) => {
    const { author_name, country } = authorData;
    const result = await pool.query(
      "UPDATE Authors SET author_name = $1, country = $2 WHERE author_id = $3 RETURNING *",
      [author_name, country, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM Authors WHERE author_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Author;