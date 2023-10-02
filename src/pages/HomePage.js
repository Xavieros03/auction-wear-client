import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to Auctionista</h1>
            <div>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;