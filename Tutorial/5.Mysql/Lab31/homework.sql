USE Lab;

CREATE TABLE books3 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    price DECIMAL(10,2),
    stock INT(10)
);

INSERT INTO books3 (title,author,price,stock)
VALUES ('Learn SQL', 'John Smith', 400, 10),
('Mastering Python', 'Jane Doe', 600, 5),
('HTML & CSS Basics', 'Alan Webb', 300, 8);

SELECT * FROM books3;

-- Increase the price of the book 'Learn SQL' by 50 and update its stock to 12.
    UPDATE books3 SET price = price + 50 , stock = 12 WHERE title = 'Learn SQL';

-- Decrease the stock by 2 for books where the price is greater than 500.
    UPDATE books3 SET stock = stock - 2 WHERE price > 500;

-- Delete the book that has book_id = 3.
    DELETE FROM books3 WHERE id = 3;

TRUNCATE TABLE books3;