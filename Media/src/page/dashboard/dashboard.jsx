import React from "react";
import Navbar from "../../assets/navbar/navbar";
import Sidebar from "../../assets/navbar/sidebar";
import Footer from "../../assets/navbar/footer";
import './style.css'
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState(null);
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
    useEffect(()=>{
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/read.php`)
                if (response.data) {
                    console.log(response.data)
                }
            } catch (error) {
                console.log("error cok : ", error)
            }
        };
        fetchdata()
    }, [])
    return(
        <div className="center">
        <Navbar/>
        <Sidebar/>
        {/* <Footer/>  */}
        </div>
    )
}
export default Dashboard;