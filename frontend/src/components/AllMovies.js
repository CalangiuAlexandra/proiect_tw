import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/AllMovies.css';

function AllMovies({ user }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get('http://localhost:3001/movies');

            const favoriteMovieIds = new Set(user.Movies.map((movie) => movie.id));
            // Verificam daca filmul este in lista de favorite
            const moviesWithFavorites = response.data.map((movie) => ({
                ...movie,
                isFavorite: favoriteMovieIds.has(movie.id),
            }));
            setMovies(moviesWithFavorites);
        };
        fetchMovies();
    }, []);

    const addToFavorite = async (movieId) => {
        try {
            await axios.post('http://localhost:3001/favorite', {
                movieId,
                userId: user.id,
            });

            // Fac update si in frontend daca am adaugat la favorite un film
            setMovies((prevMovies) =>
                prevMovies.map((movie) =>
                    movie.id === movieId ? { ...movie, isFavorite: true } : movie
                )
            );
            const addedMovie = movies.find((movie) => movie.id === movieId);
            user.Movies.push(addedMovie);
        } catch (error) {
            console.error('Error adding movie: ', error);
        }
    };

    return (
        <div className="movies-container">
            <h1 className="movies-title">Toate Filmele</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <button
                            className={`favorite-button ${movie.isFavorite ? 'favorite' : ''}`}
                            onClick={() => addToFavorite(movie.id)}
                            disabled={movie.isFavorite}
                        >
                            {movie.isFavorite ? '❤️ Favorit' : '🤍 Adaugă'}
                        </button>
                        <h2 className="movie-title">{movie.title}</h2>
                        <p className="movie-year">Lansat în: {movie.releaseYear}</p>
                        <p className="movie-director">Regizor: {movie.Director?.name || 'Necunoscut'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllMovies;
