-- Section 1 Practical Activity -- 
-- Task 1: Retrieve All Books with Their Authors
sql-- المطلوب: عرض كل الكتب مع أسماء المؤلفين
SELECT 
    B.title AS "اسم الكتاب",
    A.author_name AS "اسم المؤلف",
    B.publication_year AS "سنة النشر"
FROM Books B
INNER JOIN Authors A ON B.author_id = A.author_id;

--Task 2: Filter Books by Category
-- عرض كتب فئة "رواية" مع المؤلفين
SELECT 
    B.title,
    A.author_name,
    B.category
FROM Books B
INNER JOIN Authors A ON B.author_id = A.author_id
WHERE B.category = 'رواية';

-- عرض الكتب اللي نشرت بعد سنة 2000
SELECT 
    B.title,
    A.author_name,
    B.publication_year
FROM Books B
INNER JOIN Authors A ON B.author_id = A.author_id
WHERE B.publication_year > 2000;

--Task 3: Readers Who Borrowed Books
-- عرض القراء والكتب اللي استعاروها
SELECT 
    R.reader_name AS "اسم القارئ",
    B.title AS "اسم الكتاب",
    BB.borrow_date AS "تاريخ الاستعارة"
FROM Borrowed_Books BB
INNER JOIN Readers R ON BB.reader_id = R.reader_id
INNER JOIN Books B ON BB.book_id = B.book_id;

