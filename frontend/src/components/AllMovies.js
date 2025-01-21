import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get('http://localhost:3001/movies');
            setMovies(response.data);
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Toate Filmele</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} - {movie.releaseYear} (Regizor: {movie.Director.name})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllMovies;
