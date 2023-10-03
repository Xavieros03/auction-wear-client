import React, {useState, useEffect} from 'react';
import api from "../components/api"
import { Link } from 'react-router-dom'



function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

useEffect(() => {
    const id = localStorage.getItem('id');

    if (!id) {
        
        setError(new Error('User ID not found in localStorage.'));
        setLoading(false);
        return;
    }
    
    const fetchUser = () => {
        api
            .get(`/user/profile/${id}`) 
            .then((response) => {
                setUser(response.data);
                console.log(response.data)
                setLoading(false);

            })
            .catch((error) => {
                console.error('Error fetching user information:', error);
                setError(error);
                setLoading(false);
            });
    };
    console.log('User ID:', id)
       
        fetchUser();

    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {loading ? (
                <p>Loading user information...</p>
            ) : user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>City: {user.address.city}</p>
                        <Link to="/user/update">Update Profile</Link>
                        <Link to="/user/delete">Delete Profile</Link>
                </div>
            ) : (
                <p>Unable to fetch user information.</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}

export default UserProfile;