USE Lab;

CREATE TABLE categories(
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    cat_title VARCHAR(50)
);

CREATE TABLE books9(
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    book_name VARCHAR(50),
    author VARCHAR(50),
    category_id INT,

    INDEX (book_name),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

SELECT * FROM categories;
SELECT * FROM books9;

SHOW INDEX FROM books9;