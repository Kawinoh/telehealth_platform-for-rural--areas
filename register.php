<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Check if the email already exists
    $checkEmail = "SELECT * FROM users WHERE email = ?";
    $stmt = $pdo->prepare($checkEmail);
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        // Email already exists, redirect back to registration
        echo "Email already registered. Please use a different email or log in!";
    } else {
        // Insert new user if email is not found
        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        if ($stmt->execute([$name, $email, $password])) {
            // Registration successful, redirect to login page
            header("Location: login.html");
            exit();  // Ensure no further code is executed
        } else {
            // Registration failed
            echo "Registration failed. Please try again!";
        }
    }
}
?>
