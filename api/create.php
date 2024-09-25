<?php
include_once "../koneksi.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mendapatkan data JSON dari request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Validasi apakah semua data yang dibutuhkan ada
    if (!isset($data['nama'], $data['email'], $data['pass'], $data['gender'])) {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete data']);
        exit;
    }

    // Mengambil data dari array JSON
    $nama = $data['nama'];
    $email = $data['email'];
    $pass = $data['pass'];
    $gender = $data['gender'];

    // Mengecek apakah user dengan email ini sudah ada di database
    $stmt_check = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if ($stmt_check === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
        exit;
    }

    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // Jika data sudah ada, kembalikan pesan error
        echo json_encode(['status' => 'error', 'message' => 'User with this email already exists']);
        $stmt_check->close();
        exit;
    }

    $stmt_check->close();

    // Memasukkan data baru ke dalam tabel users
    $stmt = $conn->prepare("INSERT INTO users (nama, email, pass, gender) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
        exit;
    }

    // Bind parameter untuk query
    $stmt->bind_param("ssss", $nama, $email, $pass, $gender);

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
?>
