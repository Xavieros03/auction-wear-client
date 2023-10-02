import React, { useState } from 'react';
import api from './api'
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleUserLogin = (token, id) => {
        console.log(`User logged in with token: ${token}`);
        console.log(`User logged in with id: ${id}`)
        localStorage.setItem('token', token);
        if (id) {
            localStorage.setItem('id', id);
        }
        navigate('/main');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/auth/login', formData)
            .then((response) => {
                const authToken = response.data.authToken;
                console.log('Received authToken:', authToken);
                const id = response.data.user._id; 
                console.log('Received user ID:', id);

                
                api.get(`/user/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                    .then((userResponse) => {
                        console.log('Received user data:', userResponse.data);
                        
                        localStorage.setItem('token', authToken);
                        localStorage.setItem('id', id);
                        handleUserLogin(authToken, id);
                    })
                    .catch((error) => {
                        console.error('Error fetching user information:', error);
                    });
            })
            .catch((error) => {
                console.error('Error logging in:', error);
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