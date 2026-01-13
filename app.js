const express = require("express");
const app = express();

// Middleware  JSON
app.use(express.json());
//  Routes
const booksRoutes = require("./routes/booksRoutes");
const authorsRoutes = require("./routes/authorsRoutes");
const readersRoutes = require("./routes/readersRoutes");
const borrowedBooksRoutes = require("./routes/borrowedBooksRoutes");
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
