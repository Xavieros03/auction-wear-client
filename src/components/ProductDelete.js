import React, { useState } from 'react';
import api from '../components/api';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDelete() {
    const navigate= useNavigate()
    const { productId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = () => {
        setLoading(true);

        
        api
            .delete(`/products/delete/${productId}`)
            .then(() => {
                
                navigate('/products/all');
            })
            .catch((err) => {
                console.error('Error deleting product:', err);
                setError(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Delete Product</h2>
            {loading ? (
                <p>Deleting product...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={() => navigate('/products')}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default ProductDelete;