import React, { useState } from 'react';
import api from './api'
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        api.post('/auth/login', formData)
            .then((response) => {
                console.log(response.data.authToken);
                localStorage.setItem('token', response.data.authToken);
                navigate('/main')


            })
            .catch((error) => {
                console.error(error);

            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;