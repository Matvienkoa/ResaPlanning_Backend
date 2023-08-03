const models = require('../models/Index');
var moment = require('moment');
moment.locale('fr'); 

// Create Preparation
exports.createPreparation = (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometer === "" || req.body.kilometer === undefined ||
        req.body.condition === "" || req.body.condition === undefined ||
        req.body.startDate === "" || req.body.startDate === undefined || req.body.startDate === null ||
        req.body.endDate === "" || req.body.endDate === undefined || req.body.endDate === null ||
        req.body.startTime === "" || req.body.startTime === undefined || req.body.startTime === null ||
        req.body.endTime === "" || req.body.endTime === undefined || req.body.endTime === null ||
        req.body.customerId === "" || req.body.customerId === undefined || req.body.customerId === null) {
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
        state: 'planned',
        start: moment(req.body.startDate + " " + req.body.startTime),
        end: moment(req.body.endDate + " " + req.body.endTime),
        billed: "no"
    })
    .then((preparation) => {
        if(req.body.steps.length > 0) {
            req.body.steps.forEach(step => {
                models.Steps.create({
                    preparationId: preparation.id,
                    type: step,
                    state: 'planned'
                })
            });
        }
        res.status(201).json(preparation)
    })
    .catch(error => res.status(400).json({ error }));
}

// Edit Preparation
exports.editPreparation = async (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometer === "" || req.body.kilometer === undefined ||
        req.body.condition === "" || req.body.condition === undefined ||
        req.body.startDate === "" || req.body.startDate === undefined || req.body.startDate === null ||
        req.body.endDate === "" || req.body.endDate === undefined || req.body.endDate === null ||
        req.body.startTime === "" || req.body.startTime === undefined || req.body.startTime === null ||
        req.body.endTime === "" || req.body.endTime === undefined || req.body.endTime === null ||
        req.body.customerId === "" || req.body.customerId === undefined || req.body.customerId === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Preparations.findOne({ where: { id: req.params.id } })
    .then((preparation) => {
        preparation.update({
            immat: req.body.immat,
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            kilometer: req.body.kilometer,
            condition: req.body.condition,
            observationsDepot: req.body.observationsDepot,
            customerId: req.body.customerId,
            state: 'planned',
            start: moment(req.body.startDate + " " + req.body.startTime),
            end: moment(req.body.endDate + " " + req.body.endTime),
        })
        .then((newPreparation) => res.status(201).json(newPreparation))
        .catch(error => res.status(400).json({ error }));
    })
}

// Get All Preparations
exports.getAllPreparations = (req, res) => {
    models.Preparations.findAll()
    .then((preparations) => res.status(200).json(preparations))
    .catch(error => res.status(400).json({ error }));
}

// Get One Preparation
exports.getOnePreparation = (req, res) => {
    models.Preparations.findOne({
        where: { id: req.params.id },
        include: [{model: models.Steps}]
    })
    .then(prepa => res.status(200).json(prepa))
    .catch(error => res.status(400).json({ error }));
}