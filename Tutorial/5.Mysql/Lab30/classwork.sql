use Lab;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    in_stock VARCHAR(3) -- 'Yes' or 'No'
);

INSERT INTO products (name, category, price, in_stock) VALUES 
('Wireless Mouse', 'Electronics', 250.00, 'Yes'),
('Gaming Laptop', 'Electronics', 1200.00, 'Yes'),
('Ergonomic Chair', 'Furniture', 450.00, 'Yes'),
('Desk Lamp', 'Furniture', 120.00, 'No'),
('Mechanical Keyboard', 'Electronics', 600.00, 'No'),
('Smartwatch', 'Electronics', 800.00, 'Yes'),
('Bookshelf', 'Furniture', 1100.00, 'No'),
('Coffee Mug', 'Kitchenware', 15.00, 'Yes');

SELECT * FROM products;

-- Show all the unique product categories available in the table.
    SELECT DISTINCT(category) FROM products;

-- Select all products that are in stock and have a price less than 500.
    SELECT * FROM products WHERE in_stock = 'Yes' AND price < 500;

-- Select all products that are not in stock or have a price greater than 1000.
    SELECT * FROM products WHERE in_stock = 'No' OR price > 1000;

-- Show the names and prices of all products, and sort the results by price from highest to lowest.
    SELECT name,price FROM products ORDER BY price DESC;

-- Display the name and an expression showing the price with 18% tax added (label it as price_with_tax).
    SELECT name,(price + (price * 0.18)) AS price_with_tax FROM products ORDER BY price_with_tax DESC;

    -- trying out 
    SELECT name,price AS orginal_cost, ( (price + (price * 0.18)) - price) AS gst, (price + (price * 0.18)) AS price_with_tax FROM products ORDER BY price_with_tax DESC;