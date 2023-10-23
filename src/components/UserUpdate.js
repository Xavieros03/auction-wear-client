import React, { useState, useEffect } from 'react';
import api from '../components/api';
import { useNavigate } from 'react-router-dom';


function UserUpdateForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

    useEffect(() => {
        
        const id = localStorage.getItem('id');
        api
            .get(`/user/profile/${id}`)
            .then((response) => {
                const userData = response.data;

                
                setFormData({
                    name: userData.name,
                    email: userData.email,
                    street: userData.address.street,
                    city: userData.address.city,
                    state: userData.address.state,
                    postalCode: userData.address.postalCode,
                    country: userData.address.country,
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { street, city, state, postalCode, country } = formData;
        const id = localStorage.getItem('id');

       
        const updatedData = {
            name: formData.name,
            email: formData.email,
            address: {
                street,
                city,
                state,
                postalCode,
                country,
            },
        };

        api
            .put(`/user/profile/${id}`, updatedData) 
            .then((response) => {
                
                console.log('User updated:', response.data);
                navigate('/profile/:')
                
            })
            .catch((error) => {
               
                console.error('Error updating user:', error);
            });
    };
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">Update User Profile</h2>
            <form onSubmit={handleSubmit} className="text-lg space-y-4 text-black">
                <div className="flex flex-col items-start">
                    <label className="text-white">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">Street:</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">State:</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <button type="submit" className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default UserUpdateForm;