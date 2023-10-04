import React, { useState, useEffect } from 'react';
import api from '../components/api';
import { Link } from 'react-router-dom';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('token');

        if (userToken) {
           
            api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
        
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
        }
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <button><a href="/products/create">Create Product</a></button>
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
                            <Link to={`/products/update/${product._id}`}>Update</Link>
                            <br />
                            <Link to={`/products/delete/${product._id}`}>Delete</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;