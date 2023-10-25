import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/auth/signup', formData)
            .then((response) => {
                console.log(response.data);
                navigate('/login')

            })
            .catch((error) => {
                console.error(error);

            });
    };

    return (
        <div className="bg-darkgray text-white min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-4xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                />
                <button
                    type="submit"
                    className="w-full bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;