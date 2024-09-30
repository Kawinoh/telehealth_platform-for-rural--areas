<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = 1; // This should be the logged-in user ID
    $name = $_POST['name'];
    $bio = $_POST['bio'];
    $qualifications = $_POST['qualifications'];

    $sql = "UPDATE profiles SET name = ?, bio = ?, qualifications = ? WHERE user_id = ?";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$name, $bio, $qualifications, $user_id])) {
        echo 'Profile updated successfully';
    } else {
        echo 'Profile update failed';
    }
}
?>
