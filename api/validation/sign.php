<?php
include_once "../../koneksi.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mendapatkan data JSON dari request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Validasi apakah semua data yang dibutuhkan ada
    if (!isset($data['nama'],  $data['pass'], $data['gender'])) {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete data']);
        exit;
    }

    // Mengambil data dari array JSON
    $nama = $data['nama'];
    $pass = $data['pass'];
    $gender = $data['gender'];

    // Mengecek apakah user dengan nama ini sudah ada di database
    $stmt_check = $conn->prepare("SELECT * FROM users WHERE nama = ?");
    if ($stmt_check === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
        exit;
    }

    $stmt_check->bind_param("s", $nama);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        // Jika user dengan nama ini sudah ada, kembalikan pesan error
        echo json_encode(['status' => 'error', 'message' => 'User with this name already exists']);
        $stmt_check->close();
        exit;
    }

    $stmt_check->close();

    // Meng-hash password sebelum menyimpannya ke database
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

    // Memasukkan data baru ke dalam tabel users
    $stmt = $conn->prepare("INSERT INTO users (nama, pass, gender) VALUES (?, ?, ?)");
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
        exit;
    }

    // Bind parameter untuk query, dengan password yang sudah dihash
    $stmt->bind_param("sss", $nama,  $hashed_pass, $gender);

    // Eksekusi query
    if ($stmt->execute()) {
        echo json_encode(['status' => 1, 'message' => 'Data created successfully', 'access' => 1]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to create data']);
    }

    // Menutup statement
    $stmt->close();
}

// Menutup koneksi
$conn->close();
