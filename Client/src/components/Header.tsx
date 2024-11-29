import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Library Management System</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/add">Add Book</Link>
            </nav>
        </header>
    );
};

export default Header;
