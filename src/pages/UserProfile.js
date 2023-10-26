import React, {useState, useEffect} from 'react';
import api from "../components/api"
import { Link, useNavigate } from 'react-router-dom'



function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    

useEffect(() => {
    const id = localStorage.getItem('id');

    if (!id) {
        
        setError(new Error('User not logged in'));
        setLoading(false);
        navigate("/login")
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
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
            {loading ? (
                <p>Loading user information...</p>
            ) : user ? (
                <div className="text-xl">
                    <p><span className="font-semibold">Name:</span> {user.name}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Street:</span> {user.address.street}</p>
                    <p><span className="font-semibold">City:</span> {user.address.city}</p>
                    <p><span className="font-semibold">State:</span> {user.address.state}</p>
                    <p><span className="font-semibold">Postal Code:</span> {user.address.postalCode}</p>
                    <p><span className="font-semibold">Country:</span> {user.address.country}</p>
                    <div className="mt-4 space-x-4">
                        <Link to="/user/update">
                            <button className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                                Update Profile
                            </button>
                        </Link>
                        <Link to="/user/delete">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete Profile
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="text-2xl">Unable to fetch user information.</p>
            )}
            {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>
    );
}

export default UserProfile;