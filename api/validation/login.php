<?php
include_once "../../koneksi.php";
//include "./checked.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['nama'];
    $pass = $data['pass'];

    // Query untuk mencari user berdasarkan nama
    $stmt = $conn->prepare("SELECT id, nama, pass FROM users WHERE nama = ?");
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
        exit;
    }

    // Bind parameter nama ke query
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();

    // Jika user ditemukan
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Memverifikasi password
        if (password_verify($pass, $user['pass'])) {
            // Password benar, simpan informasi user di session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nama'];
            $_SESSION['status'] = 1;

            echo json_encode(['status' => 1, 'message' => 'Login successful']);
        } else {
            // Password salah
            echo json_encode(['status' => 0, 'message' => 'wrong password ']);
        }
    } else {
        // Jika user tidak ditemukan
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }

    $stmt->close();
}

$conn->close();
