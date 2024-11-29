import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Book } from '../types/Book';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch books from the API
    const fetchBooks = async () => {
        try {
            setLoading(true); // Start loading state
            const response = await api.get('/books');
            setBooks(response.data);
        } catch (error) {
            setError('Error fetching books');
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false); // End loading state
        }
    };

    // Handle book deletion
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            setError('Error deleting book');
            console.error('Error deleting book:', error);
        }
    };

    // Fetch books when component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Description: {book.description}</p>
                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;
