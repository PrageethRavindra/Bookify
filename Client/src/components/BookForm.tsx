import React, { useState } from 'react';
import api from '../services/api';
import axios from 'axios';

const BookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null); // To track error state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/books', { title, author, description });
            setTitle('');
            setAuthor('');
            setDescription('');
            alert('Book added successfully!');
        } catch (error) {
            // Log the full error for debugging
            if (error instanceof Error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error adding book:', error.response ? error.response.data : error.message);
                } else {
                    console.error('Error adding book:', error.message);
                }
            } else {
                console.error('Error adding book:', error);
            }
            setError('Failed to add the book. Please try again later.');
        }
    };

    // Disable submit button if any field is empty
    const isFormValid = title && author && description;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if present */}
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={!isFormValid}>Add Book</button>
        </form>
    );
};

export default BookForm;
