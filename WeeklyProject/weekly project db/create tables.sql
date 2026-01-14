-- Create Database tables -- 
CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    country VARCHAR(50)
);

CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INT REFERENCES Authors(author_id),
    category VARCHAR(50),
    publication_year INT,
    is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE Readers (
    reader_id SERIAL PRIMARY KEY,
    reader_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    membership_date DATE
);

CREATE TABLE Borrowed_Books (
    borrow_id SERIAL PRIMARY KEY,
    reader_id INT REFERENCES Readers(reader_id),
    book_id INT REFERENCES Books(book_id),
    borrow_date DATE,
    return_date DATE
);