const models = require('../models/Index');

// Get All Requests Pending for Admin
exports.getAllRequestsToAdmin = async (req, res) => {
    let preps = await models.PrepRequests.findAll({ 
        where: { state: 'pending' },
        order: [['createdAt', 'DESC']]
    })
    let slots = await models.SlotRequests.findAll({ 
        where: { state: 'pending' },
        order: [['createdAt', 'DESC']]
    })
    res.status(200).json({ preps, slots })
}