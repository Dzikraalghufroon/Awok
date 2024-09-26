import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import axios from "axios";
import './style.css'
import styles from './style.module.css'
import image from './image.png'
const AddQ = () => {
    const [question, setquestion] = useState(null);
    const [data, setdata] = useState(null)
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

    const upload = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/dashboard/upload.php`, { question }, { withCredentials: true });
            if (response.data.status) {
                navigate('/profile');
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
        </div>
    )
}
export default AddQ