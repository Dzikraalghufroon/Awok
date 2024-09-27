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
    const id_user = soal; // Jika id_user adalah parameter soal

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
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [soal]);

    // Format data sesuai dengan backend
    const formatUploadData = (id_user, question, answer, name, date) => ({
        id_soal: id_user, 
        question: question,
        answer: answer,
        name: name,
        date: date
    });

    const upload = async (e) => {
        // e.preventDefault();
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
                <form className={styles.question_form} onSubmit={upload}>
                    <input
                        className={styles.inputquestion}
                        type="text"
                        id="answer"
                        placeholder="Add your answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                    <button className={styles.buttonquestion} type="submit">Submit Answer</button>
                </form>
            </div>
        </div>
    );
};

export default Result;
