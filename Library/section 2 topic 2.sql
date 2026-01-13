-- section 2 topic 2 -- 
-- Grouping by -- 
-- عدد الكتب لكل مؤلف
SELECT 
    A.author_name AS "اسم المؤلف",
    COUNT(B.book_id) AS "عدد الكتب"
FROM Authors A
LEFT JOIN Books B ON A.author_id = B.author_id
GROUP BY A.author_name;

-- Having
-- المؤلفين اللي عندهم أكتر من كتاب واحد
-- المؤلفين اللي عندهم 3 كتب أو أكتر
SELECT 
    A.author_name,
    COUNT(B.book_id) AS "عدد الكتب"
FROM Authors A
INNER JOIN Books B ON A.author_id = B.author_id
GROUP BY A.author_name
HAVING COUNT(B.book_id) >= 3;