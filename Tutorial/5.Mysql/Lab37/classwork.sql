USE Lab;

CREATE TABLE students4(
    student_id INT UNIQUE,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE
);

CREATE TABLE courses(
    course_id INT UNIQUE,
    course_name VARCHAR(50)

);

CREATE TABLE enrollements(
    student_id INT,
    course_id INT,

    FOREIGN KEY (student_id) REFERENCES students4(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
SELECT * FROM students4;
SELECT * FROM courses;
SELECT * FROM enrollements;

DROP TABLE students4;
DROP TABLE courses;
DROP TABLE enrollements;