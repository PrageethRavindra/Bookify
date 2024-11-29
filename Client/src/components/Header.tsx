import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css'; // Import the CSS for the header styling

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <h1 className="logo">BOOKIFY</h1>
            </div>
            <nav className="nav-links">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/add">Add Book</Link>
            </nav>
        </header>
    );
};

export default Header;
