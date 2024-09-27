<?php
include_once "../../koneksi.php";

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Ambil data yang dikirim dari React
    $data = json_decode(file_get_contents('php://input'), true);

    // Ambil nama pengguna dari session dan data yang dikirim
    // $id = $_SESSION['user_name'];  // Menggunakan session untuk ID pengguna
    $id_user = $_SESSION['user_id'];
    $nama = $data['nama'];
    $pass = $data['pass'];
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
    // Query untuk update data user
    $stmt = $conn->prepare("UPDATE users SET nama = ?, pass = ? WHERE id = ?");
    $stmt->bind_param("ssi", $nama, $hashed_pass, $id_user);

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
