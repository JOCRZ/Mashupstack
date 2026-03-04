CREATE DATABASE GroceryShop;

USE GroceryShop;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2)
    );

SELECT * FROM products;

ALTER TABLE products 
ADD category VARCHAR(50) AFTER product_name;

TRUNCATE TABLE  products;

DROP DATABASE GroceryShop;