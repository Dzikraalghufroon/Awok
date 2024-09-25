<?php
session_start();

if (!isset($_SESSION['status']) || $_SESSION['status'] != 1) {
    // Jika session tidak ada atau status tidak valid
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    exit; // Menghentikan eksekusi lebih lanjut
}

// Jika session valid, kembalikan informasi pengguna
echo json_encode([
    'status' => 'success', 
    'message' => 'Session is valid',
    'user_name' => $_SESSION['user_name']
]);
?>
