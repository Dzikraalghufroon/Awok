<?php
include_once "../../koneksi.php";

// include_once "./validation.php";
$sql = "SELECT soal,name, reg_date FROM question ORDER BY RAND();";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data found']);
}

$conn->close();