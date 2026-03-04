CREATE DATABASE BookStoreDB;

USE BookStoreDB;

CREATE TABLE authors(
    author_id INT PRIMARY KEY,
    name VARCHAR(100),
    country VARCHAR(50)
);

CREATE TABLE books(
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    price DECIMAL(10,2),
    author_id INT,

    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

SELECT * FROM authors;
SELECT * FROM books;

ALTER TABLE books 
ADD published_year INT(4) AFTER title;

DELETE FROM books;

DROP DATABASE BookStoreDB;