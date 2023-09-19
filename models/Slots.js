const Sequelize = require('sequelize');
const db = require('../config/config');

const Slots = db.define('slots', {
    customerId: {
        type: Sequelize.INTEGER
    },
    observationsCustomer: {
        type: Sequelize.STRING
    },
    observationsDepot: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.STRING
    },
    start: {
        type: Sequelize.DATE
    },
    end: {
        type: Sequelize.DATE
    },
    startMonth: {
        type: Sequelize.STRING
    },
    endMonth: {
        type: Sequelize.STRING
    },
    startYear: {
        type: Sequelize.STRING
    },
    endYear: {
        type: Sequelize.STRING
    },
});

module.exports = Slots;