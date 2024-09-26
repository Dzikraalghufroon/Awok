import React, { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Result = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { soal } = useParams();

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

    // Fetch data logic
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/forum/read_forum.php?question=${soal}`, { withCredentials: true });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error Cok:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [soal]);

    return (
        <div className="center">
            <Navbar />
            <Sidebar />
            <div className="result">
                {/* Tampilkan pertanyaan di bagian atas */}
                <div>
                    
                        {data.length > 0 && (
                            <ul className="dataQuestion">
                            <p>{data[0].name}</p>
                            <p>{data[0].date}</p>
                            <p>{data[0].question}</p>
                            </ul>
                        )}
                    
                </div>

                {/* Tampilkan data lainnya kecuali item.question */}
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <ul key={index}>
                            <li>{item.username}</li>
                            <li>{item.reg_date}</li>
                            <li>{item.result}</li>
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

export default Result;
