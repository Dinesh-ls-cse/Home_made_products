<?php
// Database connection
$servername = "localhost"; // Change if your database is hosted elsewhere
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (leave empty)
$dbname = "Home_made"; // Change this to your actual database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Ensure the request is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    // SQL Query
    $sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Check if statement prepared successfully
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "SQL Error: " . $conn->error]);
        exit;
    }

    // Bind parameters and execute
    $stmt->bind_param("ssss", $name, $email, $subject, $message);
    if ($stmt->execute()) {
        // Display success message with inline CSS
        echo "
        <html>
        <head>
            <title>Message Sent</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f3f3f3;
                    text-align: center;
                    padding: 50px;
                }
                .container {
                    background-color: white;
                    padding: 30px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    display: inline-block;
                }
                h2 {
                    color: #4CAF50;
                }
                p {
                    font-size: 16px;
                    color: #555;
                }
                .ok-button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 15px;
                    border-radius: 5px;
                }
                .ok-button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully.</p>
                <button class='ok-button' onclick=\"window.location.href='../index.html'\">OK</button>
            </div>
        </body>
        </html>";
        exit;
    } else {
        echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
