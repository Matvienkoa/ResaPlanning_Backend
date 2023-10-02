const models = require('../models/Index');

// Create Step
exports.createStep = (req, res) => {
    // Empty Inputs
    if (req.body.type === "" || req.body.type === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Steps.create({
        type: req.body.type,
        state: 'planned',
        preparationId: req.body.preparationId
    })
    .then((step) => res.status(201).json(step))
    .catch(error => res.status(400).json({ error }));
}

// Append Step
exports.appendStep = async (req, res) => {
    // Empty Inputs
    if (req.body.type === "" || req.body.type === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const steps = await models.Steps.findAll({ where: { preparationId: req.body.preparationId } })
    const index = steps.findIndex(s => s.type === req.body.type)
    if (index !== -1) {
        return res.status(409).json({ message: "Cette étape existe déjà pour ce véhicule" });
    } else {
        models.Steps.create({
            type: req.body.type,
            state: 'planned',
            preparationId: req.body.preparationId
        })
        .then((step) => res.status(201).json(step))
        .catch(error => res.status(400).json({ error }));
    }
}

// Edit Type Step
exports.editStepType = async (req, res) => {
    // Empty Inputs
    if (req.body.type === "" || req.body.type === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const step = await models.Steps.findOne({ where: { id: req.params.id } })
    const steps = await models.Steps.findAll({ where: { preparationId: step.preparationId } })
    const index = steps.findIndex(s => s.type === req.body.type && s.id !== step.id)
    if (index !== -1) {
        return res.status(400).json({ message: "Cette étape existe déjà pour ce véhicule" });
    } else {
        step.update({
            type: req.body.type
        })
        .then((step) => res.status(201).json(step))
        .catch(error => res.status(400).json({ error }));
    }
    
}

// Edit State Step
exports.editStateStep = (req, res) => {
    models.Steps.findOne({ where: { id: req.params.id } })
    .then((step) => {
        step.update({
            state: req.body.state
        })
        .then((step) => res.status(201).json(step))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Delete Step
exports.deleteStep = (req, res) => {
    models.Steps.findOne({ where: { id: req.params.id } })
    .then((step) => {
        step.destroy()
        .then(() => res.status(200).json({ message: 'Etape supprimée' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Get All preparation's steps
exports.getAllStepsByPrep = (req, res) => {
    models.Steps.findAll({ where: {preparationId: req.params.id}})
    .then((steps) => res.status(200).json(steps))
    .catch(error => res.status(400).json({ error }));
}