-- Section 1 topic 1 -- 
-- عرض كل الكتب (كل الأعمدة)
SELECT * FROM Books;

-- عرض اسم الكتاب والفئة فقط
SELECT title, category FROM Books;

-- عرض الكتب اللي نشرت بعد سنة 2000
SELECT title, publication_year FROM Books
WHERE publication_year > 2000;

-- عرض كل الفئات الموجودة بدون تكرار
SELECT DISTINCT category FROM Books;

-- عرض اسم الكتاب وسنة النشر مع أسماء عربية
SELECT 
    title AS "اسم الكتاب",
    publication_year AS "سنة النشر"
FROM Books;

-- ترتيب الكتب حسب سنة النشر (من الأقدم للأحدث)
SELECT title, publication_year FROM Books
ORDER BY publication_year ASC;

-- Pagination: عرض 3 كتب بعد تخطي أول 3 (الصفحة الثانية)
SELECT title FROM Books
LIMIT 3 OFFSET 3;
