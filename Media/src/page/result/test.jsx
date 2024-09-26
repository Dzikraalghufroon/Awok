import React, { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import Footer from "../../assets/navbar/footer";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 
    const [answer, setAnswer] = useState('');
    const [idSoal, setIdSoal] = useState(null); // State untuk id_soal
    const [question, setQuestion] = useState(''); // State untuk question

    // Redirect logic
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

    // Fetch data berdasarkan halaman
    const fetchData = async (page) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/dashboard/result.php?page=${page}`);
            if (response.data && response.data.length > 0) {
                setData(prevData => [...prevData, ...response.data]); // Gabungkan data lama dengan data baru
            } else {
                setHasMore(false); // Tidak ada data lagi
            }
        } catch (error) {
            console.log("Error fetching data: ", error);
        } finally {
            setLoading(false); // Selesai fetching
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData(page);
    }, [page]); // Akan dipanggil setiap kali halaman berubah

    // Infinite Scroll - Deteksi scroll ke bawah
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && hasMore) {
            setPage(prevPage => prevPage + 1); // Muat halaman berikutnya saat mencapai bawah
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup event listener
    }, [hasMore]);

    const upload = async (e, id_soal, question) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/dashboard/forum.php`, { id_soal, question, answer }, { withCredentials: true });
            if (response.data.status === 'success') {
                console.log('Data submitted successfully');
                navigate('/'); // Navigasi setelah sukses
            } else {
                console.error('Submission failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="center">
            <Navbar />
            <Sidebar />
            <div className="result">
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <ul key={index}>
                            <li>{item.name}</li>
                            <li>{item.reg_date}</li>
                            <li>{item.soal}</li>
                            <li><a onClick={() => navigate(`/result/${item.soal}`)}>see answer</a></li>
                            <li>
                                <form onSubmit={(e) => upload(e, item.id_soal, item.soal)}> {/* Ganti dengan ID soal dan soal yang sesuai */}
                                    <input 
                                        placeholder="Enter your answer"
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        required
                                    />
                                    <button type="submit">Add</button>
                                </form>
                            </li>
                        </ul>
                    ))
                ) : (
                    !loading && <p>No data available</p>
                )}
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Dashboard;
