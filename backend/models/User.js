const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

module.exports = User;