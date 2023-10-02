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
    },
    photo: {
        type: Sequelize.STRING
    },
});

module.exports = PrepRequests;