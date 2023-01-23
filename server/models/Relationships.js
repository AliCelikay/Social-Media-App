const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Relationships extends Model {}

Relationships.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        followerUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        followUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize
    }
);

module.exports = Relationships;
