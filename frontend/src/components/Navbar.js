import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

function Navbar({ user }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">TMDB Proiect</h1>
                <ul className="navbar-links">
                    {user ? (
                        <>
                            <li><Link to="/my-movies">Filmele Mele</Link></li>
                            <li><Link to="/movies">Filme</Link></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
