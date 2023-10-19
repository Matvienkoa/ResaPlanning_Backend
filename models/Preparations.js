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
    maker: {
        type: Sequelize.STRING
    },
    slotId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Preparations;