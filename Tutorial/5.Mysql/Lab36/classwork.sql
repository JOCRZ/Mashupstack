USE Lab;

CREATE TABLE books6(
    book_id INT PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE borrowers(
    borrower_id INT PRIMARY KEY,
    name VARCHAR(100),
    book_id INT,

    FOREIGN KEY (book_id) REFERENCES books6 (book_id)
)


INSERT INTO books6(book_id,title)
VALUES (1,'The Alchemist'),
    (2,'The Power of Now'),
    (3,'Think and Grow Rich'),
    (4,'Clean Code');

INSERT INTO borrowers(borrower_id,name,book_id)
VALUES (101,'Alice',1),
    (102,'Bob',2),
    (103,'Charlie',Null);


SELECT * FROM books6;
SELECT * FROM borrowers;


-- Show the list of all books along with the name of the person who borrowed them (if borrowed).

    SELECT p.name AS borrowers, b.title AS books FROM borrowers AS p
    RIGHT JOIN books6 AS b ON p.book_id = b.book_id;
    

-- Show the list of all borrowers along with the book details they borrowed (if any).

    SELECT p.name AS borrowers, b.title AS books FROM borrowers AS p
    LEFT JOIN books6 AS b ON p.book_id = b.book_id;

-- Show the list of all books that have not been borrowed by anyone.
    
    SELECT b.title FROM books6 AS b LEFT JOIN borrowers AS p ON b.book_id = p.book_id
    WHERE p.borrower_id  IS NULL;

-- Show the list of all borrowers even if they haven't borrowed any book.-- books table

    SELECT p.name FROM borrowers AS p LEFT JOIN books6 AS b ON p.book_id = b.book_id;