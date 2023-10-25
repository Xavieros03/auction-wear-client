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
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">Delete Product</h2>
            {loading ? (
                <p className="text-white text-2xl mb-4">Deleting product...</p>
            ) : error ? (
                <p className="text-red-500 text-2xl mb-4">Error: {error.message}</p>
            ) : (
                <div>
                    <p className="text-white text-2xl mb-4">
                        Are you sure you want to delete this product?
                    </p>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className={`${loading
                                ? 'bg-orange opacity-50 cursor-not-allowed'
                                : 'bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded'
                            }`}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductDelete;