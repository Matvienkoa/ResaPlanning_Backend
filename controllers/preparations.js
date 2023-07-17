const models = require('../models/Index');

// Create Preparation
exports.createPreparation = (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometer === "" || req.body.kilometer === undefined ||
        req.body.condition === "" || req.body.condition === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Preparations.create({
        immat: req.body.immat,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        kilometer: req.body.kilometer,
        condition: req.body.condition,
        observationsDepot: req.body.observationsDepot,
        customerId: req.body.customerId,
        state: 'planned'
    })
    .then((preparation) => res.status(201).json(preparation))
    .catch(error => res.status(400).json({ error }));
}

// Get All Preparations
exports.getAllPreparations = (req, res) => {
    models.Preparations.findAll()
    .then((preparations) => res.status(200).json(preparations))
    .catch(error => res.status(400).json({ error }));
}