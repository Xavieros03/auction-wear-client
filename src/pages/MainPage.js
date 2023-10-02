import React, { useEffect, useState } from 'react';

function MainPage() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setAuthenticated(true);
        }
    }, []);

    return (
        <div>
            <h2>Welcome to the Main Page</h2>
            {authenticated ? (
                <p>This is the main page content for authenticated users.</p>
            ) : (
                <p>You need to log in to access this content.</p>
            )}
        </div>
    );
}

export default MainPage;