import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
    return (
        <nav>
            <ul>
                {user ? (
                    <>
                        <li><Link to="/my-movies">Filmele Mele</Link></li>
                        <li><Link to="/movies">Filme</Link></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
