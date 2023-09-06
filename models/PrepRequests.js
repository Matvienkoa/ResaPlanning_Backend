const Sequelize = require('sequelize');
const db = require('../config/config');

const PrepRequests = db.define('prepRequests', {
    brand: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.STRING
    },
    kilometer: {
        type: Sequelize.STRING
    },
    immat: {
        type: Sequelize.STRING
    },
    condition: {
        type: Sequelize.STRING
    },
    observationsCustomer: {
        type: Sequelize.STRING
    },
    observationsDepot: {
        type: Sequelize.STRING
    },
    deliveryDate: {
        type: Sequelize.DATE
    },
    customerId: {
        type: Sequelize.INTEGER
    },
    state: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    steps: {
        type: Sequelize.STRING
    }
});

module.exports = PrepRequests;