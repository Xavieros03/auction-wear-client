import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import api from '../components/api';
import { useNavigate } from 'react-router-dom';

function ProductUpdate() {
    const navigate = useNavigate();
    const { productId } = useParams(); 

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
    });

    useEffect(() => {
      
        api.get(`/products/${productId}`)
            .then((response) => {
                setFormData(response.data); 
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [productId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

      
        api
            .put(`/products/update/${productId}`, formData)
            .then((response) => {
                console.log('Product updated:', response.data);
                navigate("/products/all")
                
            })
            .catch((error) => {
                console.error('Error updating product:', error);
              
            });
    };

    return (
        <div>
            <h2>Update Product</h2>
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
                    Brand:
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default ProductUpdate;