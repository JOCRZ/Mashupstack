USE Lab;

CREATE TABLE books(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT,
    author TEXT,
    price INT(4),
    genre TEXT
);

INSERT INTO books (title, author, price, genre) VALUES 
('Reverend Insanity', 'Gu Zhen Ren', 450, 'Fiction'),
('Shadow Slave', 'Guiltythree', 380, 'Fiction'),
('Omniscient Readers Viewpoint', 'Sing Shong', 500, 'Science'),
('Lord of the Mysteries', 'Cuttlefish That Loves Diving', 600, 'History'),
('The Great Gatsby', 'F. Scott Fitzgerald', 300, 'Fiction'),
('The Da Vinci Code', 'Dan Brown', 420, 'Fiction'),
('A Brief History of Time', 'Stephen Hawking', 350, 'Science'),
('Sapiens', 'Yuval Noah Harari', 480, 'History');


-- Select all books that have a price greater than 400.
SELECT * FROM  books WHERE price > 400;

-- Select all books where the genre is either 'History', 'Science', or 'Fiction'.
SELECT * FROM books WHERE genre IN ('history','science','fiction');

-- Select the book where the title is exactly 'The Great Gatsby'.
SELECT * FROM books WHERE title ="the great gatsby";

-- Select all books that are not written by 'Dan Brown'.
SELECT * FROM books WHERE author = 'dan brown';