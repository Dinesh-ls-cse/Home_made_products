<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Home_made";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Track Your Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            animation: fadeIn 1s ease-in-out;
        }

        h2 {
            text-align: center;
            color: #333;
            animation: slideDown 1s ease-in-out;
        }

        form {
            max-width: 400px;
            margin: 20px auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        input[type="text"] {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus {
            border-color: #007bff;
            outline: none;
        }

        button {
            padding: 10px;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
        }

        button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }

        h3 {
            text-align: center;
            color: #007bff;
        }

        p {
            text-align: center;
            color: #666;
        }

        /* Progress Bar Styles */
        .progress-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ddd;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            animation: zoomIn 1s ease-out;
        }

        .progress-bar {
            height: 30px;
            width: 0;
            background-color: #28a745;
            text-align: center;
            line-height: 30px;
            color: white;
            border-radius: 10px;
            transition: width 0.5s ease-in-out;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    </style>
</head>
<body>
    <h2>Order Tracking</h2>
    <form method="post">
        <input type="text" name="tracking_number" placeholder="Enter Tracking Number" required>
        <button type="submit">Track Order</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['tracking_number'])) {
        $tracking_number = $conn->real_escape_string($_POST['tracking_number']);
        
        // Improved SQL Query with error handling
        $sql = "SELECT * FROM orderproduct WHERE tracking_number = '$tracking_number'";
        $result = $conn->query($sql);

        if (!$result) {
            die("Query Failed: " . $conn->error);
        }

        if ($result->num_rows > 0) {
            $order = $result->fetch_assoc();
            $status = $order['status'];

            echo "<h3>Order Status: $status</h3>";

            $progress = 0;
            if ($status == "Processing") $progress = 25;
            elseif ($status == "Shipped") $progress = 50;
            elseif ($status == "Out for Delivery") $progress = 75;
            elseif ($status == "Delivered") $progress = 100;

            echo '<div class="progress-container">';
            echo '<div class="progress-bar" style="width:' . $progress . '%;">' . $progress . '%</div>';
            echo '</div>';
        } else {
            echo "<p>No order found with that tracking number.</p>";
        }
    }

    $conn->close();
    ?>
</body>
</html>
