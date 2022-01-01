const { Sequelize } = require('sequelize')

module.exports = new Sequelize('todo_app', 'postgres', '1234', {
    host: '127.0.0.1',
    port: 5432,
    protocol: null,
    logging: false,
    dialect: 'postgres',
})
