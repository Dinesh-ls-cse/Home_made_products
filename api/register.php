<?php
/**
 * User Registration Script
 */

// Include database connection
require_once '../config/db_connect.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    // Basic validation
    $errors = [];
    
    // Check if fields are empty
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($confirm_password)) {
        $errors[] = "All fields are required";
    }
    
    // Check if email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    // Check if passwords match
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match";
    }
    
    // Check if password is at least 8 characters
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters long";
    }
    
    // Check if email already exists
    $check_email = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $check_email);
    
    if (mysqli_num_rows($result) > 0) {
        $errors[] = "Email already exists";
    }
    
    // If there are no errors, insert user into database
    if (empty($errors)) {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert user into database
        $sql = "INSERT INTO users (first_name, last_name, email, password) 
                VALUES ('$first_name', '$last_name', '$email', '$hashed_password')";
        
        if (mysqli_query($conn, $sql)) {
            // Registration successful
            echo "<script>
                  alert('Registration successful! Please login.');
                  window.location.href = '../login.html';
                  </script>";
        } else {
            // Registration failed
            echo "<script>
                  alert('Registration failed: " . mysqli_error($conn) . "');
                  window.location.href = '../register.html';
                  </script>";
        }
    } else {
        // Display errors
        echo "<script>
              alert('Registration failed: " . implode("\\n", $errors) . "');
              window.location.href = '../register.html';
              </script>";
    }
    
    // Close database connection
    mysqli_close($conn);
}
?>