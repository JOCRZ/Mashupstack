CREATE DATABASE exam;

USE  exam;

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    abscond int(2) NOT NULL
);

CREATE TABLE exam(
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT(2) NOT NULL,
    exam_status CHAR(4) NOT NULL,

    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

INSERT INTO employee (id, name, department, abscond)
VALUES 
(1, 'Raju', 'Sales', 1),
(2, 'Sangeetha', 'Sales', 3),
(3, 'Vinay', 'Operations', 8),
(4, 'Abey', 'Packing', 2),
(5, 'Thomas', 'Packing', 1),
(6, 'Muneer', 'Operations', 7),
(7, 'Aparna', 'Sales', 3),
(8, 'Abid', 'Operations', 9),
(9, 'Fathima', 'Sales', 11),
(10, 'Varghese', 'Operations', 14);

INSERT INTO exam (id, employee_id, exam_status)
VALUES 
(1, 2, 'Pass'),
(2, 5, 'Fail'),
(3, 1, 'Fail'),
(4, 8, 'Pass'),
(5, 3, 'Pass'),
(6, 1, 'Pass'),
(7, 6, 'Fail'),
(8, 9, 'Pass'),
(9, 10, 'Pass');

SELECT * FROM employee;
SELECT * FROM exam;

-- 1. Write a query to get the list of employees who took more than 5 leaves and are in sales department.

    SELECT name, abscond FROM employee
    WHERE abscond > 5 AND department = 'Sales';

-- 2. Write a query to get the number of employees working in operations department.

    SELECT COUNT(*) AS 'Employee count' FROM employee
    WHERE department = 'operations';

-- 3. Write a single query to get the count of employees working in each department.

    SELECT department, COUNT(*) AS 'Employee count' FROM employee
    GROUP BY department;


-- 4. Write a query to list the departments where all its employee altogether took more than 10 leaves.
    
    SELECT department, SUM(abscond) AS 'No of Leaves' FROM employee
    GROUP BY department
    HAVING SUM(abscond) > 10
    ORDER BY SUM(abscond) DESC;


-- 5. Write a query to list all the employee names who have passed the exam.

    SELECT employee.name AS 'Employee Who Passed' FROM employee
    JOIN exam ON employee.id = exam.employee_id
    WHERE exam.exam_status = 'Pass';

-- 6. Write a query to list all the employee names who have not attended the exam.

    SELECT employee.name FROM employee
    LEFT JOIN exam ON employee.id = exam.employee_id
    WHERE employee.id NOT IN (SELECT DISTINCT(employee_id) FROM  exam);

    SELECT employee.name FROM employee
    LEFT JOIN exam ON employee.id = exam.employee_id
    WHERE exam.employee_id IS NULL;

    SELECT name FROM employee WHERE id NOT IN (SELECT employee_id FROM exam);
