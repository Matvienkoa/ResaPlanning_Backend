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
    }
});

module.exports = Slots;