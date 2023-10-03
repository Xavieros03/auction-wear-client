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
        <div>
            <h2>Update User Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Street:
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default UserUpdateForm;