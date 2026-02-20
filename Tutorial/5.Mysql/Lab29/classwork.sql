 CREATE DATABASE Lab;

 use Lab;

CREATE TABLE students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) ,
    age INT,
    department TEXT,
    grade INT(3)
);

INSERT INTO students (name, age, department, grade) 
VALUES 
('Arjun Mehta', 20, 'Computer Science', 88),
('Sara Williams', 21, 'Electrical Engineering', 92),
('Michael Chen', 19, 'Mechanical Engineering', 75),
('Priya Sharma', 22, 'Data Science', 95);

-- Write a query to display all students whose age is greater than 20.

SELECT * FROM students WHERE Age > 20;

-- Write a query to display all students in the 'Computer Science' or 'Physics' departments.

SELECT * FROM students WHERE department IN ('computer science','physics');

-- Write a query to show the student who has the grade exactly equal to 90.

SELECT * FROM students WHERE grade = 90;

-- Write a query to find students whose grades are between 70 and 90.

SELECT * FROM students WHERE grade BETWEEN 70 AND 90;


