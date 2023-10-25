import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function HomePage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h1 className="text-6xl font-semibold mb-4">Auctionista</h1>
            <div className="space-x-4">
                <Link to="/signup">
                    <button className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                        Sign Up
                    </button>
                </Link>
                <Link to="/login">
                    <button className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;