<?php
/**
 * User Login Script
 */

// Start session
session_start();

// Include database connection
require_once '../config/db_connect.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $email = $_POST['email'];
    $password = $_POST['password'];
    $remember_me = isset($_POST['remember_me']) ? true : false;
    
    // Basic validation
    $errors = [];
    
    // Check if fields are empty
    if (empty($email) || empty($password)) {
        $errors[] = "Email and password are required";
    }
    
    // If there are no errors, check if user exists
    if (empty($errors)) {
        // Get user from database
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result) == 1) {
            // User found
            $user = mysqli_fetch_assoc($result);
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Password is correct, create session
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['logged_in'] = true;
                
                // Set remember me cookie if checked
                if ($remember_me) {
                    // Create a random token
                    $token = bin2hex(random_bytes(16));
                    
                    // Set cookie for 30 days
                    setcookie('remember_token', $token, time() + (86400 * 30), "/");
                    
                    // Store token in database (you would need to create a tokens table)
                    // This is simplified for this example
                }
                
                // Redirect to home page
                echo "<script>
                      alert('Login successful!');
                      window.location.href = '../index.html';
                      </script>";
            } else {
                // Password is incorrect
                echo "<script>
                      alert('Invalid email or password');
                      window.location.href = '../login.html';
                      </script>";
            }
        } else {
            // User not found
            echo "<script>
                  alert('Invalid email or password');
                  window.location.href = '../login.html';
                  </script>";
        }
    } else {
        // Display errors
        echo "<script>
              alert('Login failed: " . implode("\\n", $errors) . "');
              window.location.href = '../login.html';
              </script>";
    }
    
    // Close database connection
    mysqli_close($conn);
}
?>