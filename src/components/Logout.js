import React from 'react';

const Logout = ({ onLogout }) => {

    const handleLogout = () => {

        localStorage.removeItem('token');


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