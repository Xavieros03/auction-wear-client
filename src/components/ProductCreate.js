import React, { useState, useEffect } from 'react';
import api from '../components/api';

function ProductCreate() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        photo: '',
        brand: '',
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('id');
        setUser(userId);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       
        formData.owner = user;

        
        api
            .post('/products/create', formData)
            .then((response) => {
                console.log('Product created:', response.data);
               
            })
            .catch((error) => {
                console.error('Error creating product:', error);
                
            });
    };

    return (
        <div>
            <h2>Create a New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>
                    Photo URL:
                    <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
                </label>
                <label>
                    Brand:
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
                </label>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default ProductCreate;