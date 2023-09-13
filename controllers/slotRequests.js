const models = require('../models/Index');

// Create slotRequest
exports.createSlotRequest = (req, res) => {
    // Empty Inputs
    if (req.body.place === "" || req.body.place === undefined ||
        req.body.duration === "" || req.body.duration === undefined ||
        req.body.date === "" || req.body.date === undefined || req.body.date === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.SlotRequests.create({
        place: req.body.place,
        observationsCustomer: req.body.observationsCustomer,
        customerId: req.body.customerId,
        company: req.body.company,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        date: req.body.date,
        duration: req.body.duration,
        state: 'pending',
        type: 'slot'
    })
    .then((slotRequest) => res.status(201).json(slotRequest))
    .catch(error => res.status(400).json({ error }));
}

// Edit SlotRequest
exports.editSlotRequest = (req, res) => {
    // Empty Inputs
    if (req.body.place === "" || req.body.place === undefined ||
        req.body.duration === "" || req.body.duration === undefined ||
        req.body.date === "" || req.body.date === undefined || req.body.date === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    models.SlotRequests.findOne({ where: { id: req.params.id } })
    .then((slotR) => {
        slotR.update({
            place: req.body.place,
            observationsCustomer: req.body.observationsCustomer,
            date: req.body.date,
            duration: req.body.duration
        })
        .then((newSlotR) => res.status(201).json(newSlotR))
        .catch(error => res.status(400).json({ error }));
    })
}

// Validate SlotRequest
exports.validateSlotRequest = (req, res) => {
    models.SlotRequests.findOne({ where: { id: req.params.id } })
        .then((slotR) => {
            slotR.update({
                state: 'validate',
            })
            .then((newSlotR) => res.status(201).json(newSlotR))
            .catch(error => res.status(400).json({ error }));
        })
}

// Refuse SlotRequest
exports.refuseSlotRequest = (req, res) => {
    // Empty Inputs
    if (req.body.observationsDepot === "" || req.body.observationsDepot === undefined) {
        return res.status(400).json({ message: "Merci de renseigner un motif de refus" });
    }
    models.SlotRequests.findOne({ where: { id: req.params.id } })
        .then((slotR) => {
            slotR.update({
                state: 'refused',
                observationsDepot: req.body.observationsDepot
            })
            .then((newSlotR) => res.status(201).json(newSlotR))
            .catch(error => res.status(400).json({ error }));
        })
}

// Delete SlotRequest
exports.deleteSlotRequest = (req, res) => {
    models.SlotRequests.findOne({ where: { id: req.params.id } })
        .then((slotR) => {
            slotR.destroy()
                .then(() => res.status(200).json({ message: 'Demande supprimée' }))
                .catch(error => res.status(400).json({ error }));
        })
}

// Get One SlotRequest
exports.getOneSlotRequest = (req, res) => {
    models.SlotRequests.findOne({ where: { id: req.params.id } })
        .then(slotR => res.status(200).json(slotR))
        .catch(error => res.status(400).json({ error }));
}