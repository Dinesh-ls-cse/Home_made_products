USE Home_made;
CREATE TABLE orderproduct (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    status ENUM('Processing', 'Shipped', 'Out for Delivery', 'Delivered') DEFAULT 'Processing',
    tracking_number VARCHAR(255) UNIQUE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);