const { Sequilize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequilize = require('../config/connection');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.VARCHAR(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.VARCHAR(45),
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        email: {
            type: DataTypes.VARCHAR(45),
            allowNull: false,
        },
        name: {
            type: DataTypes.VARCHAR(45),
            allowNull: false,
        },
        coverPic: {
            type: DataTypes.VARCHAR(300),
        },
        profilePic: {
            type: DataTypes.VARCHAR(300)
        },
        city: {
            type: DataTypes.VARCHAR(45)
        },
        website: {
            type: DataTypes.VARCHAR(300)
        }
    },
    {
        hooks: {
          // set up beforeCreate lifecycle "hook" functionality
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Users'
      }
);


module.exports = User;
