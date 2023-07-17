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
    price: {
        type: Sequelize.INTEGER
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
    }
});

module.exports = Vehicles;