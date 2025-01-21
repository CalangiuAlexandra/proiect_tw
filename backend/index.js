const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Director, Movie, User} = require('./models');
const {genSaltSync, hashSync, compareSync} = require("bcrypt");

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const axios = require('axios');

const TMDB_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzg5MzE1NmMwMjU4ZWI0NTQ5YjRlZTc0MmM3ZTk3NSIsIm5iZiI6MTczNzQ5Nzc3OS41NzMsInN1YiI6IjY3OTAxY2IzYWNjNmZhZTZiMTlkOTQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn9wESvcCQUPjsLE88gXOYxAWWPAzfiP-j7FTJm1HsU';
const TMDB_URL = 'https://api.themoviedb.org/3';

// Sincronizez baza de date si apoi adaug niste date initiale pentru testare
sequelize.sync({ force: false }).then(async () => {
    const director = await Director.create({ name: 'Christopher Nolan' });
    const movie = await Movie.create({ title: 'Batman', releaseYear: 2014, directorId: director.id });
    const user = await User.create({ username: 'alexandra', password: "alexandra" });

    await user.addMovie(movie);
});

const handleErrorResponse = (res, error, message) => {
    console.error(`Error: ${message}`, error);
    return res.status(500).json({ success: false, message: `Error ${message}.`
    });
};

// Rute

// Rutele pentru utilizatori
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [Movie],
        });

        res.status(200).json(users);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving users');
    }
});

app.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id, {
            include: [Movie],
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving user');
    }
});

app.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body; const salt = genSaltSync(10);
        const hash = hashSync(password, salt);

        const user = await User.create({
            username: username,
            password: hash,
        });

        delete user.dataValues.password;
        res.status(201).json(user);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating user');
    }
});

app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User notfound.' });
        }

        await user.update(updatedData);

        return res.status(200).json({ success: true, message: 'User updated successfully.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating user');
    }
});

app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User notfound.' });
        }

        await user.destroy();

        return res.status(200).json({ success: true, message: 'User deletedsuccessfully.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting user');
    }
});

// Rutele pentru regizori
app.get('/directors', async (req, res) => {
    try {
        const directors = await Director.findAll();

        res.status(200).json(directors);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving directors');
    }
});

app.get('/directors/:id', async (req, res) => {
    try{
        const director = await Director.findByPk(req.params.id);

        if (!director) {
            return res.status(404).json({ success: false, message: 'Director not found.' });
        }

        res.status(200).json(director);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving director');
    }
});

app.post('/directors', async (req, res) => {
    try {
        const { name } = req.body;

        const director = await Director.create({
            name: name,
        });

        res.status(201).json(director);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating director');
    }
});

app.put('/directors/:id', async (req, res) => {
    const directorId = req.params.id;
    const updatedData = req.body;

    try {
        const director = await Director.findByPk(directorId);

        if (!director) {
            return res.status(404).json({ success: false, message: 'Director not found.' });
        }

        await director.update(updatedData);

        return res.status(200).json({ success: true, message: 'Director updated successfully.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating director');
    }
});

app.delete('/directors/:id', async (req, res) => {
    const directorId = req.params.id;

    try {
        const director = await Director.findByPk(directorId);
        if (!director) {
            return res.status(404).json({ success: false, message: 'Director not found.' });
        }

        await director.destroy();

        return res.status(200).json({ success: true, message: 'Director deleted successfully.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting director');
    }
});

// Rute pentru filme
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: [Director],
        });

        res.status(200).json(movies);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving movies');
    }
});

app.get('/movies/:id', async (req, res) => {
    try{
        const movie = await Movie.findByPk(req.params.id, {
            include: [Movie],
        });

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }

        res.status(200).json(movie);
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving movie');
    }
});

app.post('/movies', async (req, res) => {
    try {
        const { title, releaseDate, directorId } = req.body;
        const director = await Director.findByPk(directorId);

        if (!director) {
            return res.status(404).json({ success: false, message: 'Director not found.' });
        }

        const movie = await Movie.create({
            title: title,
            releaseDate: releaseDate,
            directorId: directorId
        });

        res.status(201).json(movie);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating movie');
    }
});

app.put('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const updatedData = req.body;

    try {
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }

        await movie.update(updatedData);

        return res.status(200).json({ success: true, message: 'Movie updated successfully.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating movie');
    }
});

app.post('/favorite', async (req, res) => {
    const { movieId, userId } = req.body;

    try {
        const movie = await Movie.findByPk(movieId);
        const user = await User.findByPk(userId);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        await user.addMovie(movie);

        return res.status(200).json({ success: true, message: 'Movie added.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error adding movie');
    }
});

app.delete('/movies/:id', async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found.' });
        }

        await movie.destroy();

        return res.status(200).json({ success: true, message: 'Movie deleted successfully.' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting movie');
    }
});

// Ruta de login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username }, include: [Movie] });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const userResponse = { ...user.dataValues };
        delete userResponse.password;

        res.status(200).json(user);
    } catch (error) {
        handleErrorResponse(res, error, 'Error on login');
    }
});

// Ruta pentru integrarea cu TMDB
app.get('/tmdb/search', async (req, res) => {
    const { value } = req.query;

    if (!value) {
        return res.status(400).json({ error: 'Search needs value' });
    }

    try {
        const response = await axios.get(`${TMDB_URL}/search/movie`, {
            params: {
                query: value,
            },
            headers: {
                Authorization: `Bearer ` + TMDB_KEY,
            },
        });

        res.json(response.data.results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error getting TMDB movies.' });
    }
});

// Ruta pentru a salva filmul din tmdb in sistem
app.post('/tmdb/import', async (req, res) => {
    const { movie } = req.body;

    if (!movie || !movie.title || !movie.release_date) {
        return res.status(400).json({ error: 'Invalid movie.' });
    }

    try {
        const [director, created] = await Director.findOrCreate({
            where: { name: 'Necunoscut' },
        });

        const newMovie = await Movie.create({
            title: movie.title,
            releaseYear: parseInt(movie.release_date.split('-')[0], 10),
            directorId: director.id,
        });

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Error importing movie.' });
    }
});


// Pornesc aplicatia backend pe portul 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Aplicatia a pornit!`);
});
