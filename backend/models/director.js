const { DataTypes } = require('sequelize');

// Entitate pentru regizori
const Director = (sequelize) => {
    return sequelize.define('Director', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

module.exports = Director;