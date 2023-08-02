const Sequelize = require('sequelize');
const db = require('../config/config');

const Preparations = db.define('preparations', {
    customerId: {
        type: Sequelize.INTEGER
    },
    immat: {
        type: Sequelize.STRING
    },
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
    condition: {
        type: Sequelize.STRING
    },
    observationsCustomer: {
        type: Sequelize.STRING
    },
    observationsDepot: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    photo1: {
        type: Sequelize.STRING
    },
    photo2: {
        type: Sequelize.STRING
    },
    photo3: {
        type: Sequelize.STRING
    },
    photo4: {
        type: Sequelize.STRING
    },
    start: {
        type: Sequelize.DATE
    },
    end : {
        type: Sequelize.DATE
    },
    allDay: {
        type: Sequelize.BOOLEAN
    },
    billed: {
        type: Sequelize.STRING
    },
});

module.exports = Preparations;