<?php
// Koneksi ke database
$host = 'localhost';
$db = 'Media';
$user = 'root';
$pass = '';

$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Fungsi untuk mengelola session
class MySessionHandler
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Membuka session
    public function open($savePath, $sessionName)
    {
        // Koneksi ke database jika diperlukan
        return true;
    }

    // Menutup session
    public function close()
    {
        // Tutup koneksi jika diperlukan
        return true;
    }

    // Membaca data session
    public function read($session_id)
    {
        $stmt = $this->pdo->prepare("SELECT session_data FROM sessions WHERE session_id = :session_id");
        $stmt->bindParam(':session_id', $session_id);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return $row['session_data']; // Kembalikan data session
        }

        return ''; // Tidak ada session, kembalikan string kosong
    }

    // Menulis data session
    public function write($session_id, $session_data)
    {
        $current_time = time();

        $stmt = $this->pdo->prepare("REPLACE INTO sessions (session_id, session_data, session_time) VALUES (:session_id, :session_data, :session_time)");
        $stmt->bindParam(':session_id', $session_id);
        $stmt->bindParam(':session_data', $session_data);
        $stmt->bindParam(':session_time', $current_time);
        
        return $stmt->execute();
    }

    // Menghancurkan session
    public function destroy($session_id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM sessions WHERE session_id = :session_id");
        $stmt->bindParam(':session_id', $session_id);
        
        return $stmt->execute();
    }

    // Garbage collection untuk membersihkan session yang sudah kadaluwarsa
    public function gc($max_lifetime)
    {
        $old = time() - $max_lifetime;

        $stmt = $this->pdo->prepare("DELETE FROM sessions WHERE session_time < :old");
        $stmt->bindParam(':old', $old);
        
        return $stmt->execute();
    }
}

// Set handler untuk session
$handler = new MySessionHandler($pdo);
session_set_save_handler(
    [$handler, 'open'],
    [$handler, 'close'],
    [$handler, 'read'],
    [$handler, 'write'],
    [$handler, 'destroy'],
    [$handler, 'gc']
);

// Memulai session
session_start();
