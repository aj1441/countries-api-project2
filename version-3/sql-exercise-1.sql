CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    cost NUMERIC(10, 2),
    description VARCHAR(255),
    image_url VARCHAR(2083),
    price NUMERIC(10, 2),
    product_details VARCHAR(500),
    product_name VARCHAR(255),
    sku VARCHAR(255) UNIQUE,
    stock_quantity INT
);

CREATE TABLE customer_data (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    street_address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(2),
    zip_code VARCHAR (5),
    date_created TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date TIMESTAMP,
    order_total NUMERIC(10, 2),
    order_status VARCHAR(255),
    order_details VARCHAR(255)
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    sale_price NUMERIC(10, 2),
    total_item_ordered NUMERIC(10, 2),
    total_price_per_item NUMERIC(10, 2)
);

INSERT INTO products (cost, description, image_url, price, product_details, product_name, sku, stock_quantity)  VALUES
(1.25, 'Classic, gooey, cookie with chocolate chips', 'http://www.example.com/image.jpg', 3.50, 'Made with high quality organic wheat flour and fair trade chocolate', 'Chocolate Chip Cookie', 001, 100),
(2.50, 'Sweet and salty Pistachio and white chocolate', 'http://www.example.com/image2.jpg', 4.75, 'Made with high quality organic sorghum wheat flour, USA pistachios and white chocolate', 'Pistachio White Chocolate Chip', 002, 100),
(6.00, 'White chocolate and macadamia nut cookie', 'http://www.example.com/image3.jpg', 7.50, 'Made with high quality organic wheat flour and fair trade white chocolate and macadamia nuts', 'White Chocolate Macadamion Nut', 003, 100); 

INSERT INTO customer_data (first_name, last_name, street_address, city, state, zip_code, date_created) VALUES
('John', 'Doe', '123 Main St', 'Anytown', 'CA', '12345', '2018-01-01 00:00:00'),
('Jane', 'Smith', '456 Elm St', 'Othertown', 'NY', '54321', '2018-01-01 00:00:00');

INSERT INTO orders (customer_id, order_date, order_total, order_status, order_details) VALUES
(1, '2018-01-01 00:00:00', 44.25, 'Shipped', 'Order 1'),
(2, '2018-01-01 00:00:00', 35.00, 'Shipped', 'Order 2'),
(1, '2018-01-01 00:00:00', 30.00, 'Shipped', 'Order 3');
(2, '2018-01-01 00:00:00', 37.50, 'Shipped', 'Order 4');

INSERT INTO order_items (order_id, product_id, quantity, sale_price, total_item_ordered) VALUES
(1, 1, 3, 3.50, 10.50),
(1, 2, 5, 4.75, 23.75),
(2, 1, 10, 3.50, 35.00),
(3, 3, 5, 7.50, 37.50);

UPDATE products SET product_name = 'Best Chocolate Chip Cookie Ever' WHERE product_id = 1;

DELETE FROM orders WHERE order_id = 3;

ALTER TABLE orders ADD COLUMN total_items_ordered INT;

-- What are all of the products in my store that have a quantity of greater than 10 in stock?
SELECT *  FROM products WHERE stock_quantity > 10;
-- What are all of the products in my store that cost more than $5?
SELECT *  FROM products WHERE cost > 5;
-- What are all of the orders that were placed after Jan 1, 2025?
SELECT *  FROM orders WHERE order_date > '2025-01-01 00:00:00';
-- What are all of the orders that have more than one item in the order?
SELECT *  FROM orders WHERE total_items_ordered > 1;
-- What are all of the orders that contain the product with the SKU of 001?
SELECT UNIQUE order_id FROM order_items WHERE product_id = 1;
-- What is the sum of all of the amount purchased by product?
SELECT product_id, SUM(total_item_ordered) FROM order_items GROUP BY product_id;
-- What is the sum of all of the amount purchased by order?
SELECT order_id, SUM(total_item_ordered) FROM order_items GROUP BY order_id;
-- What was the most expensive order?
SELECT MAX(order_total) FROM orders;


