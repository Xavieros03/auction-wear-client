import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-black text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-gold text-2xl font-semibold">
                    <Link to="/main">Auctionista</Link>
                </div>
                <div className="space-x-4">
                    <NavLink
                        to="/profile/:"
                        className="text-white hover:text-orange"
                        activeClassName="text-orange"
                    >
                        User Profile
                    </NavLink>
                    <NavLink
                        to="/logout"
                        className="text-white hover:text-orange"
                        activeClassName="text-orange"
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;