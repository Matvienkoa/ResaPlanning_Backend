const Sequelize = require('sequelize');
const db = require('../config/config');

const Employees = db.define('employees', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Employees;