INSERT INTO Authors (author_name, country) VALUES
('نجيب محفوظ', 'مصر'),
('أحمد خالد توفيق', 'مصر'),
('J.K. Rowling', 'بريطانيا'),
('Paulo Coelho', 'البرازيل'),
('أجاثا كريستي', 'بريطانيا'),
('عباس العقاد', 'مصر');

INSERT INTO Books (title, author_id, category, publication_year, is_available) VALUES
('الثلاثية', 1, 'رواية', 1956, TRUE),
('أولاد حارتنا', 1, 'رواية', 1959, TRUE),
('يوتوبيا', 2, 'خيال علمي', 2008, FALSE),
('في ممر الفئران', 2, 'رعب', 1995, TRUE),
('Harry Potter', 3, 'خيال', 1997, FALSE),
('The Alchemist', 4, 'رواية', 1988, TRUE),
('Murder on the Orient Express', 5, 'جريمة', 1934, TRUE),
('العبقريات', 6, 'سيرة', 1942, TRUE),
('السراب', 1, 'رواية', 1948, TRUE),
('Fantastic Beasts', 3, 'خيال', 2001, TRUE);

INSERT INTO Readers (reader_name, email, membership_date) VALUES
('أحمد محمد', 'ahmed@email.com', '2023-01-15'),
('فاطمة علي', 'fatma@email.com', '2023-03-20'),
('محمود حسن', 'mahmoud@email.com', '2023-06-10'),
('سارة إبراهيم', 'sara@email.com', '2024-01-05');

INSERT INTO Borrowed_Books (reader_id, book_id, borrow_date, return_date) VALUES
(1, 3, '2024-01-10', '2024-01-20'),
(1, 5, '2024-02-01', NULL),
(2, 2, '2024-01-15', '2024-01-25'),
(2, 7, '2024-02-10', NULL),
(3, 4, '2024-01-20', '2024-02-01'),
(3, 1, '2024-02-15', NULL),
(4, 6, '2024-01-25', '2024-02-05');