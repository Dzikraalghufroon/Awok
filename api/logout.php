<?php
include_once "../koneksi.php";
session_start();

// Hapus semua variabel session
session_unset();

// Hancurkan session
session_destroy();

// Hapus cookie sesi
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Mengakhiri sesi
session_abort();

echo json_encode(['status' => 'success', 'message' => 'Logout successful']);
?>

