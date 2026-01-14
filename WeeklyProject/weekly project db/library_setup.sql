-- Queries--
-- استخدام INNER JOIN

SELECT 
    B.book_id,
    B.title AS "اسم الكتاب",
    A.author_name AS "اسم المؤلف",
    B.category AS "الفئة",
    B.publication_year AS "سنة النشر",
    B.is_available AS "متاح؟"
FROM Books B
INNER JOIN Authors A ON B.author_id = A.author_id
ORDER BY B.title;


-- استخدام GROUP BY و HAVING
SELECT 
    A.author_name AS "اسم المؤلف",
    A.country AS "الدولة",
    COUNT(B.book_id) AS "عدد الكتب"
FROM Authors A
INNER JOIN Books B ON A.author_id = B.author_id
GROUP BY A.author_id, A.author_name, A.country
HAVING COUNT(B.book_id) > 5
ORDER BY COUNT(B.book_id) DESC;



-- استخدام COUNT و GROUP BY
SELECT 
    R.reader_name AS "اسم القارئ",
    R.email AS "البريد الإلكتروني",
    COUNT(BB.book_id) AS "عدد الكتب المستعارة"
FROM Readers R
LEFT JOIN Borrowed_Books BB ON R.reader_id = BB.reader_id
GROUP BY R.reader_id, R.reader_name, R.email
ORDER BY COUNT(BB.book_id) DESC;


-- استخدام Subquery مع IN
SELECT 
    B.title AS "اسم الكتاب",
    A.author_name AS "اسم المؤلف",
    BB.borrow_date AS "تاريخ الاستعارة",
    BB.return_date AS "تاريخ الإرجاع"
FROM Books B
INNER JOIN Borrowed_Books BB ON B.book_id = BB.book_id
INNER JOIN Authors A ON B.author_id = A.author_id
WHERE BB.reader_id IN (
    SELECT reader_id 
    FROM Readers 
    WHERE email LIKE '%@gmail.com'
)
ORDER BY BB.borrow_date DESC;