<?php
include_once "../../koneksi.php";

session_start();

if (isset($_GET['question'])) {
    $question = $_GET['question'];

    if (isset($_SESSION['user_name'])) {  
        $name = $_SESSION['user_name'];

        // Query untuk mencari data berdasarkan id (soal)
        $stmt = $conn->prepare("SELECT id, id_soal, question,result, username, reg_date, name, date FROM `forum` WHERE id_soal = ?");
        $stmt->bind_param("i", $question); 

        if ($stmt->execute()) {
            $result = $stmt->get_result(); 
            
            // Cek apakah ada data yang ditemukan
            if ($result->num_rows > 0) {
                // Mengambil semua data dalam bentuk array asosiatif
                $data = $result->fetch_all(MYSQLI_ASSOC);
                
                // Mengirim data dalam format JSON
                echo json_encode($data);
            } else {
                // Mengirim pesan jika data tidak ditemukan
                echo json_encode(['status' => 'error', 'message' => 'No data found']);
            }
        } else {
            // Mengirim pesan jika query gagal dieksekusi
            echo json_encode(['status' => 'error', 'message' => 'Failed to execute query']);
        }

        $stmt->close();
    } else {
        // Mengirim pesan jika pengguna belum terautentikasi
        echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    }
} else {
    // Mengirim pesan jika parameter 'question' tidak disertakan
    echo json_encode(['status' => 'error', 'message' => 'Question not provided']);
}

$conn->close();

