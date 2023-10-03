import React, { useState, useEffect } from 'react';
import api from '../components/api';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        api
            .get('/products/all')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            <h3>{product.name}</h3>
                            <p>Description: {product.description}</p>
                            <p>Brand: {product.brand}</p>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;