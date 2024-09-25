import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import axios from "axios";

const Profile = () => {
    const [question, setquestion] = useState(null);

    useEffect(() => {
        const fetchredirect = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked.php`,{ withCredentials: true })
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
            if (response.data.status === 1) {
                navigate('/profile');
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="center">
            <Navbar/>
            <Sidebar/>
            <div className="container">
                <form onSubmit={upload}>

                </form>
            </div>
        </div>
    )
}
export default Profile