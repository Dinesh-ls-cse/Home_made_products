<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Home_made";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update order status
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update_status'])) {
    $tracking_number = $_POST['tracking_number'];
    $status = $_POST['status'];

    $sql = "UPDATE orderproduct SET status='$status' WHERE tracking_number='$tracking_number'";
    if ($conn->query($sql) === TRUE) {
        echo "";
    } else {
        echo "Error updating status: " . $conn->error;
    }
}

// Fetch orders for admin view
$result = $conn->query("SELECT * FROM orderproduct");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Order Management</title>
</head>
<body>
<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e0f7fa;
            padding: 20px;
            animation: fadeIn 1s;
        }

        h2 {
            color: #00796b;
            text-align: center;
            margin-bottom: 20px;
            animation: slideDown 1s;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            animation: zoomIn 0.8s;
            background-color: white;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 15px;
            text-align: left;
        }

        th {
            background-color: #00796b;
            color: white;
            animation: slideRight 1s;
        }

        tr:nth-child(even) {
            background-color: #f1f8e9;
        }

        tr:hover {
            background-color: #b2dfdb;
            transition: background-color 0.3s;
        }

        select {
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ddd;
            transition: border-color 0.3s;
        }

        select:focus {
            border-color: #00796b;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        button {
            padding: 8px 15px;
            border: none;
            background-color: #00796b;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.3s, background-color 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        button:hover {
            background-color: #004d40;
            transform: translateY(-3px);
        }

        form {
            display: flex;
            gap: 10px;
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

        @keyframes slideRight {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    </style>

    <h2>Admin: Update Order Status</h2>
    <table border="1">
        <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Tracking Number</th>
            <th>Update Status</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
            <td><?php echo $row['order_id']; ?></td>
            <td><?php echo $row['customer_name']; ?></td>
            <td><?php echo $row['product_name']; ?></td>
            <td><?php echo $row['status']; ?></td>
            <td><?php echo $row['tracking_number']; ?></td>
            <td>
                <form method="post">
                    <input type="hidden" name="tracking_number" value="<?php echo $row['tracking_number']; ?>">
                    <select name="status">
                        <option <?php if ($row['status'] == 'Processing') echo 'selected'; ?>>Processing</option>
                        <option <?php if ($row['status'] == 'Shipped') echo 'selected'; ?>>Shipped</option>
                        <option <?php if ($row['status'] == 'Out for Delivery') echo 'selected'; ?>>Out for Delivery</option>
                        <option <?php if ($row['status'] == 'Delivered') echo 'selected'; ?>>Delivered</option>
                    </select>
                    <button type="submit" name="update_status">Update</button>
                </form>
            </td>
        </tr>
        <?php } ?>
    </table>

</body>
</html>

<?php $conn->close(); ?>
