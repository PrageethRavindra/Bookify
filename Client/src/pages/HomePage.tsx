import React from 'react';
import BookList from '../components/BookList';

const HomePage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
                <div className="absolute inset-0 bg-blue-800 bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Welcome to the Bookify Library</h1>
                </div>
            </div>

            {/* Book List Section */}
            <div className="container mx-auto p-6">
                <BookList mode={'viewOnly'} />
            </div>
        </div>
    );
};

export default HomePage;
