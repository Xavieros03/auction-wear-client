import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('id');
        onLogout();
    };


    React.useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;