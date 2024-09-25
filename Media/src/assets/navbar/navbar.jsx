import React from "react";
import './style.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="#">&nbsp;</a>
            </div>
            <div className="navbar-logo">
                <a href="#">Ujang</a>
            </div>
            {/* <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
            </ul> */}
        </nav>
    )
}
export default Navbar;