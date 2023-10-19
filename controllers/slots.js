const models = require('../models/Index');
var moment = require('moment');
moment.locale('fr');
const { Op } = require("sequelize");

// Create Slot
exports.createSlot = async (req, res) => {
    // Empty Inputs
    if (req.body.place === "" || req.body.place === undefined ||
        req.body.startDate === "" || req.body.startDate === undefined || req.body.startDate === null ||
        req.body.endDate === "" || req.body.endDate === undefined || req.body.endDate === null ||
        req.body.startTime === "" || req.body.startTime === undefined || req.body.startTime === null ||
        req.body.customerId === "" || req.body.customerId === undefined || req.body.customerId === null ||
        req.body.duration === "" || req.body.duration === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    let startTime = moment(req.body.startTime.hours + ":" + req.body.startTime.minutes + ":00", "HH:mm").format("HH:mm")
    let start = moment(req.body.startDate + " " + startTime)
    let end = "";
    if (req.body.endTime === "" || req.body.endTime === undefined || req.body.endTime === null) {
        end = moment(req.body.endDate + " " + startTime).add(3, 'hours')
        if (start >= end) {
            return res.status(400).json({ message: "Merci de renseigner une date de fin ultérieure" });
        }
    } else {
        let endTime = moment(req.body.endTime.hours + ":" + req.body.endTime.minutes + ":00", "HH:mm").format("HH:mm")
        end = moment(req.body.endDate + " " + endTime)
        if (start >= end) {
            return res.status(400).json({ message: "Merci de renseigner une date de fin ultérieure" });
        }
    }
    let maker = req.body.maker;
    if (maker === "" || maker === null || maker === undefined) {
        maker = "Non attribué"
    }
    const customer = await models.Customers.findOne({
        where: { id: req.body.customerId }
    })
    if (!customer) {
        return res.status(400).json({ message: "Merci de renseigner un client existant" });
    }
    models.Slots.create({
        customerId: req.body.customerId,
        company: customer.company,
        firstName: customer.firstName,
        lastName: customer.lastName,
        adress: customer.adress,
        adress2: customer.adress2,
        zipCode: customer.zipCode,
        city: customer.city,
        phone: customer.phone,
        mail: customer.mail,
        place: req.body.place,
        observationsCustomer: req.body.observationsCustomer,
        observationsDepot: req.body.observationsDepot,
        start: start,
        end: end,
        startMonth: moment(req.body.startDate).format('MM'),
        endMonth: moment(req.body.endDate).format('MM'),
        startYear: moment(req.body.startDate).format('YYYY'),
        endYear: moment(req.body.endDate).format('YYYY'),
        maker: maker,
        duration: req.body.duration
    })
    .then((slot) => res.status(201).json(slot))
    .catch(error => res.status(400).json({ error }));
}

// Edit Slot
exports.editSlot = async (req, res) => {
    // Empty Inputs
    if (req.body.place === "" || req.body.place === undefined ||
        req.body.startDate === "" || req.body.startDate === undefined || req.body.startDate === null ||
        req.body.endDate === "" || req.body.endDate === undefined || req.body.endDate === null ||
        req.body.startTime === "" || req.body.startTime === undefined || req.body.startTime === null ||
        req.body.customerId === "" || req.body.customerId === undefined || req.body.customerId === null ||
        req.body.duration === "" || req.body.duration === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    let startTime = moment(req.body.startTime.hours + ":" + req.body.startTime.minutes + ":00", "HH:mm").format("HH:mm")
    let start = moment(req.body.startDate + " " + startTime)
    let end = "";
    if (req.body.endTime === "" || req.body.endTime === undefined || req.body.endTime === null) {
        end = moment(req.body.endDate + " " + startTime).add(3, 'hours')
        if (start >= end) {
            return res.status(400).json({ message: "Merci de renseigner une date de fin ultérieure" });
        }
    } else {
        let endTime = moment(req.body.endTime.hours + ":" + req.body.endTime.minutes + ":00", "HH:mm").format("HH:mm")
        end = moment(req.body.endDate + " " + endTime)
        if (start >= end) {
            return res.status(400).json({ message: "Merci de renseigner une date de fin ultérieure" });
        }
    }
    let maker = req.body.maker;
    if (maker === "" || maker === null || maker === undefined) {
        maker = "Non attribué"
    }
    const customer = await models.Customers.findOne({
        where: { id: req.body.customerId }
    })
    if (!customer) {
        return res.status(400).json({ message: "Merci de renseigner un client existant" });
    }
    models.Slots.findOne({ where: { id: req.params.id } })
    .then((slot) => {
        slot.update({
            customerId: req.body.customerId,
            company: customer.company,
            firstName: customer.firstName,
            lastName: customer.lastName,
            adress: customer.adress,
            adress2: customer.adress2,
            zipCode: customer.zipCode,
            city: customer.city,
            phone: customer.phone,
            mail: customer.mail,
            place: req.body.place,
            observationsCustomer: req.body.observationsCustomer,
            observationsDepot: req.body.observationsDepot,
            start: start,
            end: end,
            startMonth: moment(req.body.startDate).format('MM'),
            endMonth: moment(req.body.endDate).format('MM'),
            startYear: moment(req.body.startDate).format('YYYY'),
            endYear: moment(req.body.endDate).format('YYYY'),
            maker: maker,
            duration: req.body.duration
        })
        .then((newSlot) => res.status(201).json(newSlot))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
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
            end: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds'),
            startMonth: moment(slot.start).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds').format('MM'),
            endMonth: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds').format('MM'),
            startYear: moment(slot.start).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds').format('YYYY'),
            endYear: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds').format('YYYY')
        })
        .then((newSlot) => res.status(201).json(newSlot))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
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
            end: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds'),
            endMonth: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds').format('MM'),
            endYear: moment(slot.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds').format('YYYY')
        })
        .then((newSlot) => res.status(201).json(newSlot))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Delete Slot
exports.deleteSlot = (req, res) => {
    models.Slots.findOne({ where: { id: req.params.id } })
    .then((slot) => {
        slot.destroy()
        .then(() => res.status(200).json({ message: 'Créneau supprimé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Get All Slots Customer
exports.getAllSlotsCustomer = (req, res) => {
    models.Slots.findAll({
        where: { customerId: req.params.customerId },
        order: [['createdAt', 'DESC']]
    })
        .then((preps) => res.status(200).json(preps))
        .catch(error => res.status(400).json({ error }));
}

// Get All Slots
exports.getAllSlots = (req, res) => {
    let start = req.params.start
    let end = req.params.end
    let startYear = moment(Date.parse(start)).format('YYYY')
    let startMonth = moment(Date.parse(start)).format('MM')
    let startMonthPlus = moment(Date.parse(start)).add(1, 'month').format('MM')
    let endYear = moment(Date.parse(end)).format('YYYY')
    let endMonth = moment(Date.parse(end)).format('MM')
    models.Slots.findAll({
        where: {
            [Op.or]: [
                { startMonth: startMonth, startYear: startYear },
                { startMonth: startMonthPlus, startYear: startYear },
                { startMonth: endMonth, startYear: startYear },
                { endMonth: startMonth, endYear: endYear },
                { endMonth: startMonthPlus, endYear: endYear },
                { endMonth: endMonth, endYear: endYear }
            ]
        }
    })
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