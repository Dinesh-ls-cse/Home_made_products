USE Home_made;

CREATE TABLE orders (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    address TEXT NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    district VARCHAR(100) NOT NULL,
    payment_option VARCHAR(50) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
