import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Home: View-only mode */}
          <Route path="/" element={<BookList mode="viewOnly" />} />

          {/* Books: Editable mode */}
          <Route path="/books" element={<BookList mode="editable" />} />

          {/* Add Book */}
          <Route path="/add" element={<BookForm />} />

          {/* Edit Book */}
          <Route path="/edit/:id" element={<BookForm />} />

          {/* Login */}
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />

          {/* Register */}
          <Route path="/register" element={<RegisterForm />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
