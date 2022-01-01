'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('todos', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            }),
            queryInterface.addConstraint('todos', {
                fields: ['user_id'],
                type: 'foreign key',
                name: 'custom_fkey_constraint_name', // optional
                references: {
                    table: 'users',
                    field: 'id',
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.dropTable('todos')]);
    },
};
