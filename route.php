<?php
header('Content-Type: application/json');
include "koneksi.php";

// Fungsi untuk menampilkan semua pengguna
function getUsers($pdo) {
    $stmt = $pdo->query("SELECT * FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
}

// Fungsi untuk menambahkan pengguna
function addUser($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
    $stmt->execute(['name' => $data->name, 'email' => $data->email]);
    echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'User added successfully']);
}

// Fungsi untuk memperbarui pengguna
function updateUser($pdo, $id) {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $pdo->prepare("UPDATE users SET name = :name, email = :email WHERE id = :id");
    $stmt->execute(['name' => $data->name, 'email' => $data->email, 'id' => $id]);
    echo json_encode(['message' => 'User updated successfully']);
}

// Fungsi untuk menghapus pengguna
function deleteUser($pdo, $id) {
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
    $stmt->execute(['id' => $id]);
    echo json_encode(['message' => 'User deleted successfully']);
}

// Routing berdasarkan method dan parameter
$request_method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($request_method) {
    case 'GET':
        if ($id) {
            // Ambil pengguna berdasarkan ID
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($user);
        } else {
            getUsers($pdo);
        }
        break;
    case 'POST':
        addUser($pdo);
        break;
    case 'PUT':
        if ($id) {
            updateUser($pdo, $id);
        }
        break;
    case 'DELETE':
        if ($id) {
            deleteUser($pdo, $id);
        }
        break;
    default:
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}
?>
