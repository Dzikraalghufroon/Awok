<?php
include_once "../../koneksi.php";

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mendapatkan data JSON dari request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Validasi apakah semua data yang dibutuhkan ada
    if (!isset($data['question'])) {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete data']);
        exit;
    }
    // Mengambil data dari array JSON
    $nama = $_SESSION['user_name'];
    $id_soal = $data['id_soal'];
    $question = $data['question'];
    $Answer = $data['answer'];

    // Memasukkan data baru ke dalam tabel users
    $stmt = $conn->prepare("INSERT INTO forum (id_soal, question , result, username) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
        exit;
    }

    // Bind parameter untuk query
    $stmt->bind_param("isss", $id_soal, $question,$Answer, $nama);

    // Eksekusi query
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data created successfully', 'access' => 1]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create data']);
    }

    // Menutup statement
    $stmt->close();
}

// Menutup koneksi
$conn->close();

