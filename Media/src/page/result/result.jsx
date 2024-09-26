import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import axios from "axios";
import './style.css'
import styles from './style.module.css'
import image from './image.png'
const Result = () => {
    const [question, setquestion] = useState(null);
    const [data, setdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchredirect = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked.php`, { withCredentials: true })
                if (response.data.status !== 1) {
                    // console.log(response.data.status)
                    navigate('/login')
                }
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchredirect();
    }, []);


    useEffect(() => {
        const fetchredata = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/dashboard/question.php`, { withCredentials: true });
                if (response.data) {
                    setdata(response.data);
                }
            } catch (error) {
                console.error('Error Cok:', error);
            } finally {
                setLoading(false); // Selesai fetching
            }
        };
        fetchredata();
    }, []);

    const upload = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/dashboard/upload.php`, { question }, { withCredentials: true });
            navigate('/')
            if (response.data) {

            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const Logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/logout.php`, { withCredentials: true });
            navigate('/')
            if (response.data) {

            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="center">
            <Navbar />
            <Sidebar />
            <div className={styles.container}>
                <div className={styles.Profile}>
                    <img src={image} alt="" className={styles.image} />
                    <button onClick={Logout}>logout</button>
                </div>
                <form className={styles.question_form} onSubmit={upload}>
                    <input
                        className={styles.inputquestion}
                        type="text"
                        id="name"
                        value={styles.question}
                        onChange={(e) => setquestion(e.target.value)}
                        required
                    />
                    <button className={styles.buttonquestion} type="submit">add question</button>
                </form>
            </div>
            <div className={styles.questionUser}>
                {loading ? (
                    <p>Loading...</p> // Tampilkan saat masih loading
                ) : data && data.length > 0 ? (
                    data.map((data, index) => (
                        <ul key={index}>
                            <li>{data.name}</li>
                            <li>{data.reg_date}</li>
                            <li>{data.soal}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                        </ul>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>

        </div>
    )
}
export default Result