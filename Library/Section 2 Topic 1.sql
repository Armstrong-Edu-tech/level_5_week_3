-- Section 2 Topic 1 -- 
-- عدد الكتب الكلي
SELECT COUNT(*) AS "عدد الكتب" FROM Books;

-- عدد الكتب المستعارة حالياً
SELECT COUNT(*)
FROM Borrowed_Books
