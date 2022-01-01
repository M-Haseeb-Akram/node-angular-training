const db = require('../database/connections');
const { Sequilize, DataTypes } = require('sequelize');
const Todo = require('./todos');

const User = db.define(
    'users',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        modelName: 'users',
        tableName: 'users',
    }
);

// User.hasMany(Todo, { foreignKey: 'user_id', as: 'todos' });
// Todo.belongsTo(User, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     foreignKey: 'user_id',
//     targetKey: 'id',
// });

module.exports = User;
