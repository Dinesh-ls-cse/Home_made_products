<?php
/**
 * Simple database connection file
 */

// Database credentials - CHANGE THESE TO MATCH YOUR SETUP
$db_host = "localhost";    // Usually "localhost"
$db_user = "root";         // Default MySQL username
$db_pass = "";             // Default MySQL password is empty
$db_name = "Home_made";    // Your database name

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>