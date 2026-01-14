const express = require("express");
const app = express();

// Middleware  JSON
app.use(express.json());
//  Routes
const booksRoutes = require("./topic 3.3/routes/booksRoutes");
const authorsRoutes = require("./topic 3.3/routes/authorsRoutes");
const readersRoutes = require("./topic 3.4/routes/readersRoutes");
const borrowedBooksRoutes = require("./topic 3.4/routes/borrowedBooksRoutes");
//  Routes
app.use("/api/books", booksRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api/readers", readersRoutes);
app.use("/api/borrowed", borrowedBooksRoutes);


// Route test
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to Library API 📚",
    endpoints: {
      books: "/api/books",
      authors: "/api/authors",
      readers: "/api/readers",
      borrowed: "/api/borrowed"

    }
  });
});

module.exports = app;
