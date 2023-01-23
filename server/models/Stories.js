const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stories extends Model {}

Stories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        img: {
            type: DataTypes.VARCHAR(200),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize
    }
)

module.exports = Stories;
