-- section 2 topic 3 -- 
--  Subqueries 
-- الكتب اللي كتبها نجيب محفوظ
SELECT title, publication_year
FROM Books
WHERE author_id = (
    SELECT author_id 
    FROM Authors 
    WHERE author_name = 'نجيب محفوظ'
);