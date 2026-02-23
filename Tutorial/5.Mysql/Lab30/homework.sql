USE Lab;

CREATE TABLE books2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    price DECIMAL(10,2),
    stock_status VARCHAR(15),
    genre VARCHAR(50)
);

INSERT INTO books2 (title, author, price, stock_status, genre) VALUES 
('Lord of the Mysteries', 'Cuttlefish', 850.00, 'In Stock', 'Fantasy'),
('Reverend Insanity', 'Gu Zhen Ren', 450.00, 'Out of Stock', 'Fantasy'),
('The Great Gatsby', 'F. Scott Fitzgerald', 300.00, 'In Stock', 'Classic'),
('Shadow Slave', 'Guiltythree', 350.00, 'In Stock', 'Fantasy'),
('Sapiens', 'Yuval Noah Harari', 550.00, 'In Stock', 'History'),
('Atomic Habits', 'James Clear', 400.00, 'Out of Stock', 'Self-Help'),
('Omniscient Reader', 'Sing Shong', 750.00, 'Out of Stock', 'Fantasy'),
('A Brief History of Time', 'Stephen Hawking', 320.00, 'In Stock', 'Science'),
('Beyond Good and Evil', 'Friedrich Nietzsche', 420.00, 'In Stock', 'Philosophy'),
('1984', 'George Orwell', 280.00, 'In Stock', 'Dystopian'),
('Steve Jobs', 'Walter Isaacson', 890.00, 'Out of Stock', 'Biography'),
('The Silent Patient', 'Alex Michaelides', 450.00, 'In Stock', 'Psychology'),
('The Alchemist', 'Paulo Coelho', 250.00, 'In Stock', 'Adventure'),
('Meditationes', 'Marcus Aurelius', 310.00, 'Out of Stock', 'Philosophy');


SELECT * FROM books2;

-- Show all the different genres available in the store (no duplicates).
    SELECT DISTINCT(genre) FROM books2;

-- List all books that are in stock and priced below 400.
    SELECT title,price FROM books2 WHERE price < 400;

-- List all books that are either out of stock or have a price above 700.
    SELECT * FROM books2 WHERE stock_status = 'Out of Stock' OR price > 700;

-- Show the title and price of every book along with a new column that adds 10% GST to the price.
    SELECT title, price, (price + (price * 0.10)) AS after_gst FROM books2;

-- Display the title, price, and stock_status of all books, sorted by price from highest to lowest.
    SELECT title, price, stock_status FROM books2 ORDER BY price DESC;

