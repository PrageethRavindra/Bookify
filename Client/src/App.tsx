import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main>
        <Routes>
          {/* Redirect root URL to login page if not authenticated */}
          <Route 
            path="/" 
            element={!isAuthenticated ? <Navigate to="/login" /> : <HomePage />} 
          />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected routes for authenticated users */}
          {isAuthenticated && (
            <>
              <Route path="/books" element={<BookList />} />
              <Route path="/add" element={<BookForm />} />
              <Route path="/edit/:id" element={<BookForm />} />
            </>
          )}
          
          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
