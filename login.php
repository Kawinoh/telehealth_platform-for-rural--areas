<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the user exists in the database
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // If user exists, check if the password is correct
        if (password_verify($password, $user['password'])) {
            // Correct password: log the user in and redirect to the index page
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            echo "<script>window.location.href = 'index.html';</script>";
        } else {
            // Incorrect password: show error message
            echo "<script>alert('Incorrect password. Please try again.');</script>";
        }
    } else {
        // User does not exist: redirect to the registration page
        echo "<script>alert('User does not exist. Please register.'); window.location.href = 'register.html';</script>";
    }
}
?>
