import React, { useState, useEffect } from 'react';
import api from '../components/api';
import { useNavigate } from 'react-router-dom';

function ProductCreate() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
    });
    const [image, setImage] = useState("")

    const [user, setUser] = useState(null);

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("image", e.target.files[0]);

        api.post('/products/upload', uploadData)
            .then(response => {
                // console.log("response is: ", response);
                // response carries "fileUrl" which we can use to update the state
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

        
        api
            .post('/products/create', formData)
            .then((response) => {
                navigate("/products/all")
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
                    <input type="file"  onChange={(e)=>{handleFileUpload(e)}} />
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