USE Lab;

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE deparments (
    emp_id INT PRIMARY KEY,
    deparment_name VARCHAR(50)
);

INSERT INTO employees (id,name)
VALUES (1,'Anjali'),
(2,'Rohan'),
(3,'Meena');

INSERT INTO deparments (emp_id,deparment_name)
VALUES (1,'HR'),
(2,'IT'),
(4,'Finance');

SELECT * FROM employees;
SELECT * FROM deparments;


-- Show a list of all employees along with their department name. If an employee doesn’t belong to any department, still show their name with “NULL” for the department.
    SELECT e.name,d.deparment_name FROM employees AS e LEFT JOIN deparments AS d ON e.id = d.emp_id;

-- Show only those employees who have a department assigned.

    SELECT e.name,d.deparment_name FROM employees AS e JOIN deparments AS d ON e.id = d.emp_id;

-- Show all department assignments, even if the employee doesn’t exist in the employee table-- employees table

    SELECT d.deparment_name,e.name FROM deparments AS d LEFT JOIN employees AS e ON d.emp_id = e.id;