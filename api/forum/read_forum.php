<?php
include_once "../../koneksi.php";

session_start();

// Setel tipe konten ke text/event-stream
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

if (isset($_GET['question'])) {
    $question = $_GET['question'];
    // echo "data: " . json_encode($_SESSION['user_name']) . "\n\n";

    if (isset($_SESSION['user_name'])) {  
        $name = $_SESSION['user_name'];

        // Query untuk mencari data berdasarkan id (soal)
        $stmt = $conn->prepare("SELECT id, id_soal, question, result, username, reg_date, name, date FROM `forum` WHERE id_soal = ?");
        $stmt->bind_param("i", $question); 

        if ($stmt->execute()) {
            $result = $stmt->get_result(); 
            
            // Cek apakah ada data yang ditemukan
            if ($result->num_rows > 0) {
                // Mengambil semua data dalam bentuk array asosiatif
                $data = $result->fetch_all(MYSQLI_ASSOC);
                
                // Mengirim data dalam format JSON dengan format SSE
                echo "data: " . json_encode($data) . "\n\n";
                flush(); // Flush output buffer
            } else {
                // Mengirim pesan jika data tidak ditemukan
                echo "data: " . json_encode(['status' => 'error', 'message' => 'Tidak ada data ditemukan']) . "\n\n";
                flush();
            }
        } else {
            // Mengirim pesan jika query gagal dieksekusi
            echo "data: " . json_encode(['status' => 'error', 'message' => 'Gagal mengeksekusi query']) . "\n\n";
            flush();
        }

        $stmt->close();
    } else {
        // Mengirim pesan jika pengguna belum terautentikasi
        echo "data: " . json_encode(['status' => 'error', 'message' => 'Pengguna tidak terautentikasi']) . "\n\n";
        flush();
    }
} else {
    // Mengirim pesan jika parameter 'question' tidak disertakan
    echo "data: " . json_encode(['status' => 'error', 'message' => 'Pertanyaan tidak diberikan']) . "\n\n";
    flush();
}

$conn->close();
