const models = require('../models/Index');
var moment = require('moment');
moment.locale('fr'); 

// Create Slot
exports.createSlot = (req, res) => {
    // Empty Inputs
    if (req.body.place === "" || req.body.place === undefined ||
        req.body.startDate === "" || req.body.startDate === undefined || req.body.startDate === null ||
        req.body.endDate === "" || req.body.endDate === undefined || req.body.endDate === null ||
        req.body.startTime === "" || req.body.startTime === undefined || req.body.startTime === null ||
        req.body.endTime === "" || req.body.endTime === undefined || req.body.endTime === null ||
        req.body.customerId === "" || req.body.customerId === undefined || req.body.customerId === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Slots.create({
        customerId: req.body.customerId,
        place: req.body.place,
        observationsCustomer: req.body.observationsCustomer,
        observationsDepot: req.body.observationsDepot,
        start: moment(req.body.startDate + " " + req.body.startTime),
        end: moment(req.body.endDate + " " + req.body.endTime)
    })
    .then((slot) => res.status(201).json(slot))
    .catch(error => res.status(400).json({ error }));
}

// Edit Slot
exports.editSlot = (req, res) => {
    // Empty Inputs
    if (req.body.place === "" || req.body.place === undefined ||
        req.body.startDate === "" || req.body.startDate === undefined || req.body.startDate === null ||
        req.body.endDate === "" || req.body.endDate === undefined || req.body.endDate === null ||
        req.body.startTime === "" || req.body.startTime === undefined || req.body.startTime === null ||
        req.body.endTime === "" || req.body.endTime === undefined || req.body.endTime === null ||
        req.body.customerId === "" || req.body.customerId === undefined || req.body.customerId === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.Slots.findOne({ where: { id: req.params.id } })
    .then((slot) => {
        slot.update({
            customerId: req.body.customerId,
            place: req.body.place,
            observationsCustomer: req.body.observationsCustomer,
            observationsDepot: req.body.observationsDepot,
            start: moment(req.body.startDate + " " + req.body.startTime),
            end: moment(req.body.endDate + " " + req.body.endTime)
        })
        .then((newSlot) => res.status(201).json(newSlot))
        .catch(error => res.status(400).json({ error }));
    })
}

// Drop Slot
exports.dropSlot = (req, res) => {
    // Empty Inputs
    if (req.body.deltaD === "" || req.body.deltaD === undefined || req.body.deltaD === null ||
        req.body.deltaM === "" || req.body.deltaM === undefined || req.body.deltaM === null) {
        return res.status(400).json({ message: "Un problème est survenu!" });
    }
    models.Slots.findOne({ where: { id: req.params.id } })
        .then((slot) => {
            slot.update({
                start: moment(slot.start).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds'),
                end: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds')
            })
                .then((newSlot) => res.status(201).json(newSlot))
                .catch(error => res.status(400).json({ error }));
        })
}

// Size Slot
exports.sizeSlot = (req, res) => {
    // Empty Inputs
    if (req.body.deltaD === "" || req.body.deltaD === undefined || req.body.deltaD === null ||
        req.body.deltaM === "" || req.body.deltaM === undefined || req.body.deltaM === null) {
        return res.status(400).json({ message: "Un problème est survenu!" });
    }
    models.Slots.findOne({ where: { id: req.params.id } })
        .then((slot) => {
            slot.update({
                end: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds')
            })
                .then((newSlot) => res.status(201).json(newSlot))
                .catch(error => res.status(400).json({ error }));
        })
}

// Delete Slot
exports.deleteSlot = (req, res) => {
    models.Slots.findOne({ where: { id: req.params.id } })
    .then((slot) => {
        slot.destroy()
        .then(() => res.status(200).json({ message: 'Créneau supprimé' }))
        .catch(error => res.status(400).json({ error }));
    })
}

// Get All Slots
exports.getAllSlots = (req, res) => {
    models.Slots.findAll()
    .then((slots) => res.status(200).json(slots))
    .catch(error => res.status(400).json({ error }));
}

// Get One Slot
exports.getOneSlot = (req, res) => {
    models.Slots.findOne({
        where: { id: req.params.id }
    })
    .then(slot => res.status(200).json(slot))
    .catch(error => res.status(400).json({ error }));
}