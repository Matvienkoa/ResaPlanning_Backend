const Sequelize = require('sequelize');
const db = require('../config/config');

const Users = db.define('users', {
    login: {
        type: Sequelize.STRING,
        unique: 'login'
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    }
});

module.exports = Users;