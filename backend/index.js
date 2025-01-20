const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Director, Movie, User} = require('./models');

const app = express();

app.use(bodyParser.json());

// Sincronizez baza de date si apoi adaug niste date initiale pentru testare
sequelize.sync({ force: true }).then(async () => {
    const director = await Director.create({ name: 'Christopher Nolan' });
    const movie = await Movie.create({ title: 'Batman', releaseYear: 2014, directorId: director.id });
    const user = await User.create({ username: 'alexandra', password: "alexandra" });

    await user.addMovie(movie);
});

// Pornesc aplicatia backend pe portul 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Aplicatia a pornit!`);
});
