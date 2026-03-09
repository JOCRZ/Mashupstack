USE Lab;

CREATE TABLE authors2 (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    INDEX (author_id)
);

CREATE TABLE books8(
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    author_id INT,

    FOREIGN KEY (author_id) REFERENCES authors2(author_id)
);

SELECT * FROM authors2;
SELECT * FROM books8;