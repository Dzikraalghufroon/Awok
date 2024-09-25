<?php
$host = 'localhost';
$db = 'Media';
$user = 'root'; 
$pass = ''; 

$conn = new mysqli($host, $user, $pass, $db);

// Mengizinkan hanya origin tertentu (React app yang berjalan di localhost:5173)
header("Access-Control-Allow-Origin: http://localhost:5173");

// Mengizinkan pengiriman kredensial seperti cookie, otentikasi
header("Access-Control-Allow-Credentials: true");

// Mengizinkan metode HTTP tertentu (GET, POST, PUT, DELETE, OPTIONS)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Mengizinkan header tertentu dari klien
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Menangani permintaan preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}