import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './css/Login.css';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password
            });
            setUser(response.data);
            navigate('/my-movies');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Autentifica-te</h1>
                <input
                    type="text"
                    className="login-input"
                    placeholder="Nume Utilizator"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="login-input"
                    placeholder="Parola"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
