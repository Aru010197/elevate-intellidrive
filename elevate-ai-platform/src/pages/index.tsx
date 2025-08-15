import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                Welcome to Elevate
            </h1>
            <p className="mt-4 text-lg text-center text-gray-700">
                Your AI-driven wealth investment platform.
            </p>
        </div>
    );
};

export default Home;