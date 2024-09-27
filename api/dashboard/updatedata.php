<?php
include_once "../../koneksi.php";

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Ambil data yang dikirim dari React
    $data = json_decode(file_get_contents('php://input'), true);

    // Ambil nama pengguna dari session dan data yang dikirim
    $id = $_SESSION['user_name'];  // Menggunakan session untuk ID pengguna
    $nama = $data['nama'];
    $pass = $data['pass'];
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
    // Query untuk update data user
    $stmt = $conn->prepare("UPDATE users SET nama = ?, pass = ? WHERE nama = ?");
    $stmt->bind_param("sss", $nama, $hashed_pass, $id);

    if ($stmt->execute()) {
        // Berikan respons jika berhasil
        echo json_encode(['status' => 'success', 'message' => 'Data updated successfully']);
    } else {
        // Berikan respons jika gagal
        echo json_encode(['status' => 'error', 'message' => 'Failed to update data']);
    }

    // Tutup statement
    $stmt->close();
}

// Tutup koneksi database
$conn->close();
