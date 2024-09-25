<?php
session_start();

// Cek apakah pengguna sudah login
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}

// Jika login, berikan akses ke data dashboard atau lainnya
echo json_encode([
    'status' => 'success',
    'message' => 'Welcome to the dashboard',
    'user' => [
        'id' => $_SESSION['user_id'],
        'name' => $_SESSION['user_name'],
        'email' => $_SESSION['user_email']
    ]
]);
?>
