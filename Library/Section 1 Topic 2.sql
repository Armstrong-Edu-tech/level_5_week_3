-- Section 1 Topic 2 -- 
-- عرض الكتب مع أسماء المؤلفين
SELECT 
    Books.title AS "اسم الكتاب",
    Authors.author_name AS "اسم المؤلف"
FROM Books
INNER JOIN Authors ON Books.author_id = Authors.author_id; 

-- عرض كل المؤلفين (حتى لو مالهمش كتب)
SELECT 
    A.author_name,
    B.title
FROM Authors A
LEFT JOIN Books B ON A.author_id = B.author_id; 

-- عرض كل الكتب (حتى لو مالهاش مؤلف)
SELECT 
    B.title,
    A.author_name
FROM Authors A
RIGHT JOIN Books B ON A.author_id = B.author_id;

-- عرض كل المؤلفين وكل الكتب
SELECT 
    A.author_name,
    B.title
FROM Authors A
FULL JOIN Books B ON A.author_id = B.author_id;  