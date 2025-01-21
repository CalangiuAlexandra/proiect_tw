import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/MyMovies.css';

function MyMovies({ user }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get(`http://localhost:3001/users/${user.id}`);
            setMovies(response.data.Movies || []);
        };
        fetchMovies();
    }, [user]);

    return (
        <div className="movies-container">
            <h1 className="movies-title">Filmele Mele</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <h2 className="movie-title">{movie.title}</h2>
                        <p className="movie-year">Lansat în: {movie.releaseYear}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyMovies;
