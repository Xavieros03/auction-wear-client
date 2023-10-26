import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 rounded text-black"
                />
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="w-2/3 md:w-1/2 bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded"
                    >
                        Sign Up
                    </button>
                    <Link to="/" className="text-blue-400 text-sm">
                        Back
                    </Link>
                </div>
                <small className="text-gray-400 text-sm">
                    *Password must be atleast 8 characters long and contain at least one number, one lower case, and one upper case letter
                </small>
            </form>
        </div>
    );
}

export default SignUp;