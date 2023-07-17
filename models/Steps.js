const Sequelize = require('sequelize');
const db = require('../config/config');

const Steps = db.define('steps', {
    preparationId: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    }
});

module.exports = Steps;