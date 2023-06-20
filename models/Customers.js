const Sequelize = require('sequelize');
const db = require('../config/config');

const Customers = db.define('customers', {
    userId: {
        type: Sequelize.INTEGER
    },
    company: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    adress: {
        type: Sequelize.STRING
    },
    adress2: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    }
});

module.exports = Customers;