import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      
      localStorage.removeItem('authToken');
      // Update authentication state
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <header style={{ backgroundColor: '#f4f4f4', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
      <h1>Bookify</h1>
      <nav>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
            <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/books" style={{ margin: '0 10px' }}>Books</Link>
            <Link to="/add" style={{ margin: '0 10px' }}>Add Book</Link>
            <button onClick={handleLogout} style={{ cursor: 'pointer', margin: '0 10px' }}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
