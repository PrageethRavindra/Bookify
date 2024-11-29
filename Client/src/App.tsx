import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookForm from './components/BookForm';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<BookForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
