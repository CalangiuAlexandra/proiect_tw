import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Filmele Mele</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} - {movie.releaseYear}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyMovies;
