<?php
include_once "../koneksi.php";

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];

    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete data']);
    }

    $stmt->close();
}

$conn->close();
?>
