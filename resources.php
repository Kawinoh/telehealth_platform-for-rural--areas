<?php
include 'db.php';

$sql = "SELECT * FROM resources";
$stmt = $pdo->query($sql);
$resources = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($resources);
?>