import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Book } from '../types/Book';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/books');
            setBooks(response.data);
        } catch (error) {
            setError('Error fetching books');
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            setError('Error deleting book');
            console.error('Error deleting book:', error);
        }
    };

    const handleUpdate = async () => {
        if (updatedBook) {
            try {
                await api.put(`/books/${updatedBook.id}`, updatedBook);
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === updatedBook.id ? updatedBook : book
                    )
                );
                setEditingBook(null);
                setUpdatedBook(null);
            } catch (error) {
                setError('Error updating book');
                console.error('Error updating book:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingBook) {
            const { name, value } = e.target;
            setUpdatedBook({
                ...updatedBook,
                [name]: value,
            } as Book);
        }
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book);
        setUpdatedBook(book);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex">
            {/* Books positioned on the right */}
            <div className="w-full md:w-2/3 lg:w-3/4 bg-gray-50 rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Book List</h2>
                {books.length === 0 ? (
                    <p className="text-center text-gray-500">No books available.</p>
                ) : (
                    <ul className="space-y-4">
                        {books.map((book) => (
                            <li
                                key={book.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                                        <p className="text-sm text-gray-600">Author: {book.author}</p>
                                        <p className="text-sm text-gray-500">{book.description}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Editing Form */}
            {editingBook && (
                <div className="w-full md:w-1/3 lg:w-1/4 mt-8 md:mt-0 md:ml-6 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Book</h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={updatedBook?.title || ''}
                                onChange={handleInputChange}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={updatedBook?.author || ''}
                                onChange={handleInputChange}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={updatedBook?.description || ''}
                                onChange={handleInputChange}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingBook(null)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BookList;
