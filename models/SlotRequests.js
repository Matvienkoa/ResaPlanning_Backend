const Sequelize = require('sequelize');
const db = require('../config/config');

const SlotRequests = db.define('slotRequests', {
    observationsCustomer: {
        type: Sequelize.STRING
    },
    observationsDepot: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    customerId: {
        type: Sequelize.INTEGER
    },
    state: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
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

module.exports = SlotRequests;