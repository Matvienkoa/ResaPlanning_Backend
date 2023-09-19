const models = require('../models/Index');

// Get All Preparations Completed
exports.getAllPreparationsCompleted = async (req, res) => {
    let billing = await models.Preparations.findAll({ 
        where: { state: 'completed', billed: 'no' },
        order: [['end', 'ASC']]
    })
    let billed = await models.Preparations.findAll({ 
        where: { state: 'completed', billed: 'yes' },
        order: [['end', 'ASC']]
    })
    res.status(200).json({ billing, billed })
}