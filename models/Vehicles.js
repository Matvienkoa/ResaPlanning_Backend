const Sequelize = require('sequelize');
const db = require('../config/config');

const Vehicles = db.define('vehicles', {
    brand: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.STRING
    },
    kilometers: {
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
    immat: {
        type: Sequelize.STRING
    },
    observations: {
        type: Sequelize.STRING
    },
    marketPrice: {
        type: Sequelize.INTEGER
    },
    publicPrice: {
        type: Sequelize.INTEGER
    },
    purchasePrice: {
        type: Sequelize.INTEGER
    },
    frevosPrice: {
        type: Sequelize.INTEGER
    },
    frevos: {
        type: Sequelize.STRING
    },
    firstHand: {
        type: Sequelize.STRING
    }
});

module.exports = Vehicles;