<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $patient_id = 1; // This should be the logged-in patient ID
    $provider_id = $_POST['provider'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    $sql = "INSERT INTO appointments (patient_id, provider_id, date, time) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$patient_id, $provider_id, $date, $time])) {
        echo 'Appointment booked successfully';
    } else {
        echo 'Appointment booking failed';
    }
}
?>
