<?php
session_start();

// Hapus semua variabel session
session_unset();

// Hancurkan session
session_destroy();

echo json_encode(['status' => 'success', 'message' => 'Logout successful']);
?>
