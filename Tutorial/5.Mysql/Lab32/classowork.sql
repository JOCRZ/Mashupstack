USE Lab;

CREATE TABLE mobiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100),
    model VARCHAR(50),
    price DECIMAL(10,2),
    stock INT(10)
);

INSERT INTO mobiles (brand,model,price,stock)
VALUES ('Samsung', 'Galaxy M14', 12000, 30),
('Redmi', 'Note 12', 15000, 25),
('Realme', 'Narzo 50', 13000, 20),
('Samsung', 'Galaxy A23', 18000, 10);

SELECT * FROM mobiles;

-- Display all mobiles that cost more than 13000 or have stock less than 15.
    SELECT * FROM mobiles WHERE price > 13000 OR stock < 15;

-- Increase the stock by 5 and update the price to 12500 for the mobile with model = 'Narzo 50'.
    UPDATE mobiles SET stock = 5 , price = 12500 WHERE model = 'Narzo 50';

-- Delete the mobile whose id is 2.
    DELETE  FROM mobiles WHERE id = 2;

-- Find the lowest and highest price in the table.
    SELECT MIN(price) AS min_price , MAX(price) AS max_price FROM mobiles;

-- Find the total stock of all mobiles in the table.
    SELECT SUM(stock) AS total_stock FROM mobiles;

-- Show the top 2 most expensive mobiles.
    SELECT * FROM mobiles ORDER BY price DESC LIMIT 2;