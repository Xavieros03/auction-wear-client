import React, { useState } from 'react';
import api from './api'

function SignUp() {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/auth/signup', formData)
            .then((response) => {
                console.log(response.data);
                
            })
            .catch((error) => {
                console.error(error);
                
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;