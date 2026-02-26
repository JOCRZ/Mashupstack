USE Lab;

CREATE TABLE books4 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    price DECIMAL(10,2),
    stock INT(10)
);

INSERT INTO books4 (title,author,price,stock)
VALUES ('The Alchemist', 'Paulo Coelho', 350, 50),
('Atomic Habits', 'James Clear', 450, 40),
('The Psychology of Money', 'Morgan Housel', 400, 30),
('Ikigai', 'Francesc Miralles', 300, 60),
('Deep Work', 'Cal Newport', 500, 20);

SELECT * FROM books4;

-- Display all books that cost less than 450 and have stock more than 30.
    SELECT * FROM books4 WHERE price < 450 AND stock > 30;

-- Update the stock to 45 and reduce the price to 420 for the book titled ‘Deep Work’.
    UPDATE books4 SET stock = 45 , price = 420 WHERE title = "Deep Work";

-- Delete the book titled ‘Ikigai’.
    DELETE FROM books4 WHERE title = 'Ikigai';

-- Show the average book price and total number of books currently in the table.
    SELECT AVG(price) AS avg_price , COUNT(*) FROM books4;

-- Display the top 3 most expensive books available.
    SELECT * FROM books4 ORDER BY price DESC LIMIT 3;