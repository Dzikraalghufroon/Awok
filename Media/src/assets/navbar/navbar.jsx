import React from "react";
import './style.css'
import Logo from './feax-.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="#">&nbsp;</a>
            </div>
            <div className="navbar-logo">
                <a href="#"><img src={Logo} alt=""/>Feaxs</a>
            </div>
            {/* <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
            </ul> */}
        </nav>
    )
}
export default Navbar;