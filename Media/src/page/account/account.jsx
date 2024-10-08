import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import axios from "axios";
import './style.css';
import styles from './style.module.css';
import image from './image.png';
import PopupForm from "./popup";

const Profile = () => {
    const [question, setquestion] = useState('');
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setusername] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [togle, settogle] = useState(false);
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = async (data) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/dashboard/updatedata.php`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setSubmittedData(response.data);
            console.log("Response from server:", response.data);
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/logout.php`, {}, { withCredentials: true });
                if (response.data) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error updating data:", error);
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }

        handleClosePopup(); // Tutup popup setelah submit
    };



    // const handleSubmit = async (data) => {
    //     setSubmittedData(data);
    //     console.log("Data submitted:", data);
    //     try {
    //         const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/dashboard/updatedata.php`, { data }, { withCredentials: true });
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     // Di sini kamu bisa melakukan API call atau mengirim data ke server
    // };

    useEffect(() => {
        const fetchredirect = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked.php`, { withCredentials: true });
                if (response.data.status !== 1) {
                    navigate('/login');
                }
                else {
                    setusername(response.data.user_name)
                }
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchredirect();
    }, [navigate]);

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
                setLoading(false);
            }
        };
        fetchredata();
    }, []);

    const upload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/dashboard/upload.php`, { question }, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const Logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/logout.php`, {}, { withCredentials: true });
            if (response.data) {
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('YAkiN KaH deK?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/api/dashboard/delete.php?id=${id}`, { withCredentials: true });
                if (response.status === 200) {
                    setdata(data.filter(item => item.id !== id)); // Filter data setelah berhasil dihapus
                }
            } catch (error) {
                console.error('Error cok:', error);
            }
        }
    };

    // Fungsi untuk toggle dropdown
    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };
    function popUp() {
        return (
            <div>
                <p>Halo bung</p>
            </div>
        )
    }
    function muncul() {
        settogle()
    }

    return (
        <div className="center">
            <Navbar />
            <Sidebar />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.Profile}>
                        <div className={styles.info}>
                            <h2>{username}</h2>
                            <img src={image} alt="" className={styles.image} />
                            <button onClick={Logout} className={styles._button}>Logout</button><br />
                            <button onClick={handleOpenPopup} className={styles._button}>Update Account</button>
                        </div>
                    </div>
                </div>
                <form className={styles.question_form} onSubmit={upload}>
                    <input
                        className={styles.inputquestion}
                        type="text"
                        id="name"
                        placeholder="Add your question"
                        value={question}
                        onChange={(e) => setquestion(e.target.value)}
                        required
                    />
                    <button className={styles.buttonquestion} type="submit">Add question</button>
                </form>
            </div>
            <div className={styles.questionUser}>
                {loading ? (
                    <p>Loading...</p>
                ) : data && data.length > 0 ? (
                    data.map((item) => (
                        <ul key={item.id} className={styles.questionItem}>

                            <li>{item.name}</li>

                            <li>{item.reg_date}</li>

                            <li>{item.soal}</li>
                            <li><a className={styles.a} onClick={() => navigate(`/result/${item.id}`)}>See answer</a></li>
                            <li>
                                <div className={styles.dropdownContainer}>

                                    <button className={styles.ellipsisButton} onClick={() => toggleDropdown(item.id)}>
                                        &#x22EE;
                                    </button>

                                    {dropdownOpen === item.id && (
                                        <div className={styles.dropdownMenu}>
                                            <button onClick={() => handleDelete(item.id)}>Hapus</button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
            <PopupForm
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onSubmit={handleSubmit}
            />

            {submittedData && (
                <div>
                    <h2>Server Response:</h2>
                    <p>{submittedData.message}</p>
                </div>
            )}
        </div >
    );
};

export default Profile;
