-- Practical Activity Section 2 --
-- Task 1 -- 
-- Total borrowed books per reader
SELECT 
    R.reader_name AS "Reader Name",
    COUNT(BB.book_id) AS "Total Borrowed Books"
FROM Readers R
LEFT JOIN Borrowed_Books BB ON R.reader_id = BB.reader_id
GROUP BY R.reader_name;
-- Currently borrowed books per reader
SELECT 
    R.reader_name AS "Reader Name",
    COUNT(BB.book_id) AS "Books Currently Borrowed"
FROM Readers R
LEFT JOIN Borrowed_Books BB ON R.reader_id = BB.reader_id
WHERE BB.return_date IS NULL
GROUP BY R.reader_name;

-- TAsk 2 --
-- Authors with more than 1 book
SELECT 
    A.author_name AS "Author Name",
    COUNT(B.book_id) AS "Number of Books"
FROM Authors A
INNER JOIN Books B ON A.author_id = B.author_id
GROUP BY A.author_name
HAVING COUNT(B.book_id) > 1
ORDER BY COUNT(B.book_id) DESC;

-- Task 3 --
-- Books borrowed by reader "Ahmed Mohamed"
SELECT title, category
FROM Books
WHERE book_id IN (
    SELECT book_id
    FROM Borrowed_Books
    WHERE reader_id = (
        SELECT reader_id
        FROM Readers
        WHERE reader_name = 'Ahmed Mohamed'
    )
);