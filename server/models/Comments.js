const { Sequilize, Model, DataTypes } = require('sequelize');
const sequilize = require('../config/connection');

class Comments extends Model{};

Comments.init(
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
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATETIME,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        }
    }
)
