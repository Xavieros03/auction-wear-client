import React, { useState, useEffect } from 'react';
import api from '../components/api';
import { useNavigate } from 'react-router-dom';

function ProductCreate() {
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
    });
    const [image, setImage] = useState("")

    const [user, setUser] = useState(null);

    const handleFileUpload = (e) => {
       

        const uploadData = new FormData();

       
        uploadData.append("image", e.target.files[0]);

        api.post('/products/upload', uploadData)
            .then(response => {
                setImage(response.data.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

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
        formData.image = image
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setAuthenticated(true);
        
        api
            .post('/products/create', formData)
            .then((response) => {
                navigate("/products/all")
                console.log('Product created:', response.data);
               
            })
            .catch((error) => {
                console.error('Error creating product:', error);
                
            });
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-white">
            <h2 className="text-3xl font-semibold mb-4">Create a New Product</h2>
            {authenticated ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2">
                        Photo URL:
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => handleFileUpload(e)}
                        className="w-full p-2 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="brand" className="block mb-2">
                        Brand:
                    </label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full p-2 rounded text-black"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded"
                >
                    Create Product
                </button>
            </form>
            ) : (
                    <p className="text-white">You need to log in to access this content.</p>
            )}
        </div>
    );
}

export default ProductCreate;