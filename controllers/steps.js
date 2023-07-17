const models = require('../models/Index');

// Create Step
exports.createStep = (req, res) => {
    // Empty Inputs
    if (req.body.type === "" || req.body.type === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Steps.create({
        type: req.body.type,
        state: 'waiting',
        preparationId: req.body.preparationId
    })
        .then((step) => res.status(201).json(step))
        .catch(error => res.status(400).json({ error }));
}