import React from 'react';
import { Link, NavLink} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link to="/main">Auctionista</Link>
            </div>
            <div className="nav-links">
                <NavLink to="/profile/:">User Profile</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;