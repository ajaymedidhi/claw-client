import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './index.css'; // Make sure to import the CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const token = response.data.token; // Access the token from the response
            console.log('JWT Token:', token); // Log the token to the console
            localStorage.setItem('token', token); // Save the token in localStorage
            navigate('/'); // Navigate to the Home component
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return ( 
        <div className='login'>
            <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <Link to="/signup" className="register-link">New user? Register here</Link>
        </div>
        </div>
        
    );
};

export default Login;
