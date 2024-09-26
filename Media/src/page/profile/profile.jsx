import React, { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import Footer from "../../assets/navbar/footer";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Testing = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [answer, setAnswer] = useState('');
    const [currentEdit, setCurrentEdit] = useState({ id_soal: -1, question: '', answer: '' });

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
                setData(prevData => [...prevData, ...response.data]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    const handleUpload = (id_soal, question, answer) => {
        setCurrentEdit({ id_soal, question, answer });
    };

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/dashboard/forum.php`, currentEdit, { withCredentials: true });
            if (response.data.status === 'success') {
                console.log('Data successfully updated');
                setData(prevData =>
                    prevData.map(item =>
                        item.id === currentEdit.id_soal
                            ? { ...item, answer: currentEdit.answer }
                            : item
                    )
                );
                setCurrentEdit({ id_soal: -1, question: '', answer: '' });
            } else {
                console.error('Error updating data:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="center">
            <Navbar />
            <Sidebar />
            <div className="result">
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        currentEdit.id_soal === item.id ? (
                            <ul key={item.id}>
                                <li>{item.name}</li>
                                <li>{item.reg_date}</li>
                                <li>{item.soal}</li>
                                <li>
                                    <input
                                        type="text"
                                        // value={currentEdit.answer}
                                        onChange={(e) => setCurrentEdit({ ...currentEdit, answer: e.target.value })}
                                    />
                                </li>
                                <li>
                                    <button type="submit" onClick={(e) => handlePost(e)}>Update</button>
                                </li>
                            </ul>
                        ) : (
                            <ul key={item.id}>
                                <li>{item.name}</li>
                                <li>{item.reg_date}</li>
                                <li>{item.soal}</li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleUpload(item.id, item.soal, item.name)}
                                    >
                                        Comment
                                    </button>
                                </li>
                            </ul>
                        )
                    ))
                ) : (
                    !loading && <p>No data available</p>
                )}
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Testing;
