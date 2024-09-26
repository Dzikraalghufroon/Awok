<?php
include_once '../../koneksi.php';
// include_once '../validation/checked.php';

session_start();
$name = $_SESSION['user_name'];
$stmt = $conn->prepare("SELECT id, name, soal,reg_date FROM question WHERE name = ?");

// Bind parameter nama ke query
$stmt->bind_param("s", $name);
$stmt->execute();
$result = $stmt->get_result();

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data found']);
}

$conn->close();

