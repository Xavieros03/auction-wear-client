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
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">Product List</h2>
            <button className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                <Link to="/products/create">Create Product</Link>
            </button>
            {loading ? (
                <p className="text-white">Loading products...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : (
                <ul className="text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <li key={product._id} className="my-4">
                            <img src={product.image} alt={product.name} className="w-48 h-48 object-cover my-2" />
                            <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                            <div className="flex space-x-4">
                                <Link
                                    to={`/products/update/${product._id}`}
                                    className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded"
                                >
                                    Update
                                </Link>
                                <Link
                                    to={`/products/delete/${product._id}`}
                                    className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;