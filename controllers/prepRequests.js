const models = require('../models/Index');

// Create prepRequest
exports.createPrepRequest = (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometer === "" || req.body.kilometer === undefined ||
        req.body.condition === "" || req.body.condition === undefined ||
        req.body.deliveryDate === "" || req.body.deliveryDate === undefined || req.body.deliveryDate === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.PrepRequests.create({
        immat: req.body.immat,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        kilometer: req.body.kilometer,
        condition: req.body.condition,
        observationsCustomer: req.body.observationsCustomer,
        customerId: req.body.customerId,
        company: req.body.company,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        deliveryDate: req.body.deliveryDate,
        state: 'pending',
        type: 'prep',
        steps: req.body.steps
    })
    .then((prepRequest) => res.status(201).json(prepRequest))
    .catch(error => res.status(400).json({ error }));
}

// Edit PrepRequest
exports.editPrepRequest = (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometer === "" || req.body.kilometer === undefined ||
        req.body.condition === "" || req.body.condition === undefined ||
        req.body.deliveryDate === "" || req.body.deliveryDate === undefined || req.body.deliveryDate === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.PrepRequests.findOne({ where: { id: req.params.id } })
    .then((prepR) => {
        prepR.update({
            immat: req.body.immat,
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            kilometer: req.body.kilometer,
            condition: req.body.condition,
            observationsCustomer: req.body.observationsCustomer,
            deliveryDate: req.body.deliveryDate,
            steps: req.body.steps
        })
        .then((newPrepR) => res.status(201).json(newPrepR))
        .catch(error => res.status(400).json({ error }));
    })
}

// Validate PrepRequest
exports.validatePrepRequest = (req, res) => {
    models.PrepRequests.findOne({ where: { id: req.params.id } })
    .then((prepR) => {
        prepR.update({
            state: 'validate',
        })
        .then((newPrepR) => res.status(201).json(newPrepR))
        .catch(error => res.status(400).json({ error }));
    })
}

// Refuse PrepRequest
exports.refusePrepRequest = (req, res) => {
    // Empty Inputs
    if (req.body.observationsDepot === "" || req.body.observationsDepot === undefined) {
        return res.status(400).json({ message: "Merci de renseigner un motif de refus" });
    }
    models.PrepRequests.findOne({ where: { id: req.params.id } })
        .then((prepR) => {
            prepR.update({
                state: 'refused',
                observationsDepot: req.body.observationsDepot
            })
            .then((newPrepR) => res.status(201).json(newPrepR))
            .catch(error => res.status(400).json({ error }));
        })
}

// Delete PrepRequest
exports.deletePrepRequest = (req, res) => {
    models.PrepRequests.findOne({ where: { id: req.params.id } })
    .then((prepR) => {
        prepR.destroy()
        .then(() => res.status(200).json({ message: 'Demande supprimée' }))
        .catch(error => res.status(400).json({ error }));
    })
}

// Get All Requests
exports.getAllRequests = async (req, res) => {
    let preps = await models.PrepRequests.findAll({ where: { customerId: req.params.id }})
    let slots = await models.SlotRequests.findAll({ where: { customerId: req.params.id } })
    res.status(200).json({preps, slots})
}

// Get One PrepRequest
exports.getOnePrepRequest = (req, res) => {
    models.PrepRequests.findOne({ where: { id: req.params.id}})
    .then(prepR => res.status(200).json(prepR))
    .catch(error => res.status(400).json({ error }));
}