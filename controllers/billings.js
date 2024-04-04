const models = require('../models/Index');
var moment = require('moment');
moment.locale('fr');

// Get All Preparations Completed No Billed
exports.getAllPreparationsCompletedNoBilled = (req, res) => {
    models.Preparations.findAll({ 
        where: { state: 'completed', billed: 'no' },
        order: [['end', 'DESC']]
    })
    .then((prep) => res.status(200).json(prep))
    .catch(error => res.status(400).json({ error }));
}

// Get All Preparations Completed Billed
exports.getAllPreparationsCompletedBilled = (req, res) => {
    let date = req.params.date;
    let year = moment(Date.parse(date)).format('YYYY');
    let month = moment(Date.parse(date)).format('MM');
    models.Preparations.findAll({
        where: { state: 'completed', billed: 'yes', endMonth: month, endYear: year },
        order: [['end', 'DESC']]
    })
    .then((prep) => res.status(200).json(prep))
    .catch(error => res.status(400).json({ error }));
}