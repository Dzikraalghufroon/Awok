import React, { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";

const Result = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const { soal } = useParams();
    const id_user = soal;

    // Logika redirect
    useEffect(() => {
        const fetchRedirect = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked.php`, { withCredentials: true });
                if (response.data.status !== 1) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchRedirect();
    }, [navigate]);

    // Siapkan SSE
    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_SERVER}/api/forum/read_forum.php?question=${soal}`);

        eventSource.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            if (Array.isArray(newData)) {
                setData(prevData => [...prevData, ...newData]);
                setLoading(false);
            } else {
                console.error(newData.message);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource gagal:', error);
            eventSource.close(); // Tutup koneksi saat terjadi kesalahan
        };

        return () => {
            eventSource.close(); // Bersihkan koneksi saat komponen di-unmount
        };
    }, [soal]);

    const upload = async (e) => {
        e.preventDefault();
        if (data.length > 0) {
            const question = data[0].question;
            const date = data[0].date;
            const name = data[0].name;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER}/api/dashboard/forum.php`,
                    formatUploadData(id_user, question, answer, name, date),
                    { withCredentials: true }
                );

                if (response.data.status === 'success') {
                    console.log('Data successfully updated');
                } else {
                    console.error('Error updating data:', response.data.message);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
    };

    return (
        <div className="center">
            <Navbar />
            <Sidebar />
            <div className="result">
                <div>
                    {data.length > 0 && (
                        <ul className="dataQuestion">
                            <p>{data[0].name}</p>
                            <p>{data[0].date}</p>
                            <p>{data[0].question}</p>
                        </ul>
                    )}
                </div>

                {data.length > 0 ? (
                    data.map((item, index) => (
                        <ul key={index}>
                            <li>{item.username}</li>
                            <li>{item.reg_date}</li>
                            <li>{item.result}</li>
                        </ul>
                    ))
                ) : (
                    !loading && <p>Tidak ada data tersedia</p>
                )}

                {loading && <p>Memuat...</p>}
                <form className={styles.question_form} onSubmit={upload}>
                    <input
                        className={styles.inputquestion}
                        type="text"
                        id="answer"
                        placeholder="Tambahkan jawaban Anda"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                    <button className={styles.buttonquestion} type="submit">Kirim Jawaban</button>
                </form>
            </div>
        </div>
    );
};

export default Result;
