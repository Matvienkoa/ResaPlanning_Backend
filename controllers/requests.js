const models = require('../models/Index');

// Get All Requests Pending for Admin
exports.getAllRequestsToAdmin = async (req, res) => {
    let preps = await models.PrepRequests.findAll({ where: { state: 'pending' } })
    let slots = await models.SlotRequests.findAll({ where: { state: 'pending' } })
    res.status(200).json({ preps, slots })
}