import React, { useState } from 'react';
import './style.css'; 
import image from './image.png'
import image1 from './image2.png'
import { useNavigate } from 'react-router-dom';
import Satu from "./home1.png"
import Dua from "./profile.png"
import Tiga from "./search.png"
import Empat from "./setting.png"
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk membuka/menutup sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Button untuk toggle sidebar */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? <img src={image1} alt="" className='sidebar-toggle-image'/> : <img src={image} alt=""  className='sidebar-toggle-image'/>}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><a onClick={() => navigate("/")}><img src={Satu} alt="" />Home</a></li>
                    <li><a onClick={() => navigate("/profile")}><img src={Dua} alt="" />Profile</a></li>
                    <li><a onClick={() => navigate("/")}><img src={Tiga} />Search</a></li>
                    <li><a onClick={() => navigate("/")}><img src={Empat} />Setting</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
