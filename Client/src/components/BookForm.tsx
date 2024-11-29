import React, { useState } from 'react';
import api from '../services/api';
import axios from 'axios';

const BookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null); // Error state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/books', { title, author, description });
            setTitle('');
            setAuthor('');
            setDescription('');
            alert('Book added successfully!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error adding book:', error.response ? error.response.data : error.message);
            } else {
                console.error('Error adding book:', error);
            }
            setError('Failed to add the book. Please try again later.');
        }
    };

    const handleClear = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setError(null); // Reset the error message, if any
    };

    // Validation for form
    const isFormValid = title && author && description;

    return (
        <div
            className="bg-gray-50 min-h-screen flex justify-center items-center px-8"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh", 
                margin: 0, 
            }}
        >
            {/* Form Container */}
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Add New Book</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title:    
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Author Input */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                            Author:
                        </label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-1/2 py-3 px-4 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                        >
                            Add Book
                        </button>

                        {/* Clear Button */}
                        <button
                            type="button"
                            onClick={handleClear}
                            className="w-1/2 py-3 px-4 text-white font-semibold rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
