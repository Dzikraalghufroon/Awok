<?php
include_once "../../koneksi.php";

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        if (isset($_SESSION['user_name'])) {
            $name = $_SESSION['user_name'];
            $id_user = $_SESSION['user_id'];

            $stmt = $conn->prepare("DELETE FROM `question` WHERE id = ? AND id_user = ?");
            $stmt->bind_param("ii", $id, $id_user);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Data deleted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to delete data']);
            }

            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID not provided']);
    }
}

$conn->close();
?>
