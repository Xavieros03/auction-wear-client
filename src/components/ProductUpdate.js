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
                navigate("/products/all");
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">Update Product</h2>
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
                    <label className="text-white">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white">Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 rounded focus:outline-none"
                    />
                </div>
                <button type="submit" className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default ProductUpdate;