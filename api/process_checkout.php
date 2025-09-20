<?php
include 'db_connection.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and escape input data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $pname = mysqli_real_escape_string($conn, $_POST['pname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $mobile = mysqli_real_escape_string($conn, $_POST['mobile']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $pincode = mysqli_real_escape_string($conn, $_POST['pincode']);
    $district = mysqli_real_escape_string($conn, $_POST['district']);
    $payment_option = mysqli_real_escape_string($conn, $_POST['payment_option']);

    // Function to generate a unique tracking number
    function generateTrackingNumber($length = 8) {
        return 'TRK' . strtoupper(substr(md5(uniqid(rand(), true)), 0, $length));
    }

    // Generate a unique tracking number
    $tracking_number = generateTrackingNumber();

    // Insert customer order details into the "orders" table
    $sql = "INSERT INTO orders (name, email, mobile, address, pincode, district, payment_option)
            VALUES ('$name', '$email', '$mobile', '$address', '$pincode', '$district', '$payment_option')";

    if ($conn->query($sql) === TRUE) {
        $customer_name = $name;
        $product_name = $pname;

        // Insert product order details into the "orderproduct" table
        $sql1 = "INSERT INTO orderproduct (customer_name, product_name, status, tracking_number) 
                 VALUES ('$customer_name', '$product_name', 'Processing', '$tracking_number')";

        if ($conn->query($sql1) === TRUE) {
            echo '
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                        animation: fadeIn 1s ease-in-out;
                    }

                    .success-container {
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                        text-align: center;
                        animation: slideIn 0.8s ease-out;
                    }

                    h1 {
                        color: #28a745;
                        margin-bottom: 20px;
                        animation: bounce 1.2s infinite;
                    }

                    p {
                        font-size: 1.2rem;
                        color: #333;
                        margin: 10px 0;
                        animation: fadeUp 1s ease-in-out;
                    }

                    .highlight {
                        font-weight: bold;
                        color: #007bff;
                    }

                    /* Home Button Styles */
                    .home-button {
                        display: inline-block;
                        margin-top: 30px;
                        padding: 12px 24px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 1rem;
                        cursor: pointer;
                        text-decoration: none;
                        transition: background-color 0.3s, transform 0.2s;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    .home-button:hover {
                        background-color: #0056b3;
                        transform: translateY(-5px);
                    }

                    /* Animations */
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideIn {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes fadeUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                </style>
            </head>
            <body>
                <div class="success-container">
                    <h1>Order Placed Successfully!</h1>
                    <p>Customer Name: <span class="highlight">'.$customer_name.'</span></p>
                    <p>Product Name: <span class="highlight">'.$product_name.'</span></p>
                    <p>Tracking Number: <span class="highlight">'.$tracking_number.'</span></p>
                    
                    <!-- Home Button -->
                    <a href="../index.html" class="home-button">Go to Home</a>
                </div>
            </body>
            </html>';
        } else {
            echo "Error inserting into orderproduct table: " . $conn->error;
        }
    } else {
        echo "Error inserting into orders table: " . $conn->error;
    }

    $conn->close();
}
?>
