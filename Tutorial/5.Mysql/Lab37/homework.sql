USE Lab;

CREATE TABLE authors(
    author_id INT PRIMARY KEY,
    author_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE
);

CREATE TABLE books7(
    book_id INT PRIMARY KEY,
    book_title VARCHAR(50) NOT NULL,
    author_id INT,

    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

SELECT * FROM books7;
SELECT * FROM authors;