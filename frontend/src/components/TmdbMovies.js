import React, { useState } from 'react';
import axios from 'axios';
import './css/TmdbMovies.css';

function TmdbMovies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const searchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tmdb/search?value=' + query);
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching TMDB movies:', error);
        }
    };

    const importMovie = async (movie) => {
        try {
            await axios.post('http://localhost:3001/tmdb/import', { movie });
            setSuccessMessage(`Filmul "${movie.title}" a fost importat cu succes!`);
            setTimeout(() => setSuccessMessage(''), 3000); // Reset mesaj după 3 secunde
        } catch (error) {
            console.error('Error importing movie:', error);
        }
    };

    return (
        <div className="tmdb-container">
            <h1>Caută Filme din TMDB</h1>
            <div className="tmdb-search">
                <input
                    type="text"
                    placeholder="Introdu titlul filmului..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={searchMovies}>Cauta</button>
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="tmdb-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="tmdb-card">
                        <h2>{movie.title}</h2>
                        <p>Lansat în: {movie.release_date || 'Necunoscut'}</p>
                        <button onClick={() => importMovie(movie)}>Importa</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TmdbMovies;
