const { DataTypes } = require('sequelize');

// Entitate pentru filme
const Movie = (sequelize) => {
    return sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseYear: {
            type: DataTypes.INTEGER,
        },
    });
};

module.exports = Movie;