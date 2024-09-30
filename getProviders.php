<?php
include 'db.php';

// Set the content type to JSON
header('Content-Type: application/json');

try {
    $sql = "SELECT * FROM providers";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $providers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the JSON-encoded data
    echo json_encode($providers);
} catch (Exception $e) {
    // Output an error message in JSON format
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
?>
