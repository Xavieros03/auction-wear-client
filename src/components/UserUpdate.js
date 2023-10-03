import React, { useState } from 'react';
import api from '../components/api';

function UserUpdateForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

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
            .put(`/user/profile/${id}`, updatedData) // Make sure to use the correct URL with userId
            .then((response) => {
                
                console.log('User updated:', response.data);
                
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