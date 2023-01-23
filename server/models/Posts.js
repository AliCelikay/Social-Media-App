const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        desc: {
            type: DataTypes.VARCHAR(200),
        },
        img: {
            type: DataTypes.VARCHAR(200),
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATETIME,
        }
    },
    {
        sequelize
    }
)
