USE Lab;

CREATE TABLE students2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    course VARCHAR(50),
    fees_paid DECIMAL(10,2),
    status VARCHAR(10)
);

INSERT INTO students2 (name,course,fees_paid,status)
VALUES ('Alice', 'Web Development', 5000, 'Inactive'),
('Bob', 'Data Science', 7000, 'Inactive'),
('Charlie', 'UI/UX Design', 4000, 'Active');

SELECT * FROM students2;

-- Use a query to view only those students whose fees_paid is greater than 5000.
    SELECT * FROM students2 WHERE fees_paid > 5000;

-- Update the status to 'Active' for students in the 'Web Development' course.
    UPDATE students2 SET status = 'Active' WHERE course = 'Web Development';

-- Increase the fees_paid by 1000 for students enrolled in 'Data Science'.
    UPDATE students2 SET fees_paid = fees_paid + 1000 WHERE course = 'Data Science';

-- Update both status to 'Inactive' and reduce fees_paid by 500 for the student whose id is 3.
    UPDATE students2 SET fees_paid = fees_paid - 500 WHERE id = 3;

-- Delete the student whose id is 2.
    DELETE FROM students2 WHERE id = 2;

-- Delete all students who are 'Inactive'.
    DELETE FROM students2 WHERE status = 'Inactive';


TRUNCATE TABLE books3;

