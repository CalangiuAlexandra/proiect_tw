const { Sequelize } = require('sequelize');

// Am ales o baza de date sqlite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: 'database/database.sqlite',
    logging: false,
});

const User = require('./user')(sequelize);
const Director = require('./director')(sequelize);
const Movie = require('./movie')(sequelize);

// Aici setez relatiile intre entitati si tabele
Movie.belongsTo(Director, { foreignKey: 'directorId' });
Director.hasMany(Movie, { foreignKey: 'directorId' });

User.belongsToMany(Movie, { through: 'UserMovies' });
Movie.belongsToMany(User, { through: 'UserMovies' });

module.exports = {
    sequelize,
    User,
    Director,
    Movie,
};
