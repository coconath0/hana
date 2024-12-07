import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/flowers" className="nav-link">View Flowers</Link>
            <Link to="/add-flower" className="nav-link">Add Flower</Link>
            <Link to="/restock-flower" className="nav-link">Restock Flowers</Link>
            <Link to="/sell-flower" className="nav-link">Sell Flowers</Link>
        </nav>
    );
};

export default NavBar;
