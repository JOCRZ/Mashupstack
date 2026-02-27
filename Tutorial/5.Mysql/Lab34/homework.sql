USE Lab;

CREATE TABLE mobiles2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50),
    score INT(3),
    bonus INT(1),
    challenge VARCHAR(50)
);

 INSERT INTO mobiles2 (name, city, score, bonus, challenge)
VALUES ('Raj', 'Chennai', 88, 5, 'Fitness'),
('Anu', 'Mumbai', 91, NULL, 'Diet'),
('Ravi', 'Chennai', 78, 3, 'Fitness'),
('Meena', 'Delhi', 82, NULL, 'Diet'),
('Farah', 'Mumbai', 95, 4, 'Fitness'),
('Kiran', 'Pune', 70, NULL, 'Yoga'),
('Latha', 'Pune', 87, NULL, 'Fitness');

SELECT * FROM mobiles2;

-- Show the details of users whose score is greater than the average score across all users.
    SELECT * FROM mobiles2 WHERE score > (SELECT AVG(score) FROM mobiles2);

-- Display the names of users who are participating in the same challenge as the user named 'Farah'.
    SELECT * FROM mobiles2 WHERE challenge = (SELECT challenge FROM mobiles2 WHERE name = 'Farah');

