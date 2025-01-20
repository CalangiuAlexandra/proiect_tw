const { DataTypes } = require('sequelize');

// Entitate pentru utilizatori
const User = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: DataTypes.STRING,
    });
};

module.exports = User;