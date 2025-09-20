<?php
/**
 * Check if user is logged in
 */

// Start session
session_start();

// Check if user is logged in
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // User is logged in
    $response = array(
        'logged_in' => true,
        'user_name' => $_SESSION['user_name'],
        'user_email' => $_SESSION['user_email']
    );
} else {
    // User is not logged in
    $response = array(
        'logged_in' => false
    );
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>