USE Lab;

CREATE TABLE books5 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(50),
    genre VARCHAR(25),
    price DECIMAL(10,2),
    copies_sold INT(50)  
);

CREATE TABLE books5_bestseller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(50),
    genre VARCHAR(25),
    price DECIMAL(10,2),
    copies_sold INT(50)  
);

INSERT INTO books5 (id,title,author,genre,price,copies_sold)
VALUES (1,'The Silent Patient', 'Alex Michaelides', 'Thriller', 399.00, 1200),
(2,'Atomic Habits', 'James Clear', 'Self-help', 499.00, 2000),
(3,'The Psychology of Money', 'Morgan Housel', 'Finance', 350.00, 1800);

INSERT INTO books5_bestseller (id,title,author,genre,price,copies_sold)
VALUES (4,'Ikigai', 'Francesc Miralles', 'Philosophy', 300.00, 2500),
(5,'Think Like a Monk', 'Jay Shetty', 'Self-help', 450.00, 2200);

SELECT * FROM books5;
SELECT * FROM books5_bestseller;

TRUNCATE TABLE books5;
TRUNCATE TABLE books5_bestseller;


-- Show the list of all books from both tables, displaying only the title and author.
    SELECT * FROM books5
    UNION
    SELECT * FROM books5_bestseller;

-- Display all books from the books table where the price is greater than 400.
    SELECT * FROM books5 WHERE price > 400;

-- Show the average price of books in the books table.
    SELECT AVG(price) AS average_price FROM books5;

-- Display the number of books in the books table using a count.
    SELECT COUNT(*) AS no_of_books FROM books5;

-- Show the title and author from books table with aliases Book Title and Written By.
    SELECT CONCAT(title,' Written By ',author) AS 'Author & Title'  FROM books5;