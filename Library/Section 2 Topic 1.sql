-- Section 2 Topic 1 -- 
-- عدد الكتب الكلي
SELECT COUNT(*) AS "عدد الكتب" FROM Books;

-- عدد الكتب المستعارة حالياً
SELECT COUNT(*)
FROM Borrowed_Books


SELECT SUM(price)
FROM Books;



SELECT AVG(price) 
FROM Books;
	


SELECT MIN(price) 
FROM Books;
	


SELECT MAX(price) 
FROM Books;




