<?php
include_once "../koneksi.php";

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
    $nama = $data['nama'];
    $email = $data['email'];
    $pass = $data['pass'];
    $gender = $data['gender'];

    $stmt = $conn->prepare("UPDATE users SET nama = ?, email = ? ,pass = ? , gender = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $nama, $email, $pass, $gender,$id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update data']);
    }

    $stmt->close();
}

$conn->close();
?>
