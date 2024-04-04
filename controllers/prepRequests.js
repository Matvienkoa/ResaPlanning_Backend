const models = require('../models/Index');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const { Op } = require("sequelize");

exports.checkDuplicate = async (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.deliveryDate === "" || req.body.deliveryDate === undefined || req.body.deliveryDate === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    try {
        const prepRequests = await models.PrepRequests.findAll({
            where: { immat: req.body.immat }
        });
        const preps = await models.Preparations.findAll({
            where: { immat: req.body.immat }
        });
        const combinedResults = [...prepRequests, ...preps];
        return res.status(200).json(combinedResults);
    } catch (error) {
        console.error("Error when checking for duplicates:", error);
        return res.status(500).json({ message: "An error occurred while checking for duplicates." });
    }
};

exports.checkDuplicateEdit = async (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.deliveryDate === "" || req.body.deliveryDate === undefined || req.body.deliveryDate === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    try {
        const prepRequests = await models.PrepRequests.findAll({
            where: { immat: req.body.immat, id: { [Op.ne]: req.params.id } }
        });
        const preps = await models.Preparations.findAll({
            where: { immat: req.body.immat }
        });
        const combinedResults = [...prepRequests, ...preps];
        return res.status(200).json(combinedResults);
    } catch (error) {
        console.error("Error when checking for duplicates:", error);
        return res.status(500).json({ message: "An error occurred while checking for duplicates." });
    }
};

// Create prepRequest
exports.createPrepRequest = async (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.deliveryDate === "" || req.body.deliveryDate === undefined || req.body.deliveryDate === null) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    const customer = await models.Customers.findOne({
        where: { id: req.body.customerId }
    })
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
        steps: req.body.steps,
        company: customer.company,
        firstName: customer.firstName,
        lastName: customer.lastName,
        adress: customer.adress,
        adress2: customer.adress2,
        zipCode: customer.zipCode,
        city: customer.city,
        phone: customer.phone,
        mail: customer.mail,
    })
    .then((prepRequest) => res.status(201).json(prepRequest))
    .catch(error => res.status(400).json({ error }));
}

// Create prepRequest with photo
exports.createPrepRequestPhoto = async (req, res) => {
    // Empty Inputs
    if (!req.file) {
        return res.status(400).json({ message: "Merci d'ajouter un fichier" });
    }
    if (req.body.deliveryDate === "" || req.body.deliveryDate === undefined || req.body.deliveryDate === null) {
        return res.status(400).json({ message: "Merci de renseigner une date de livraison souhaitée" });
    }
    const customer = await models.Customers.findOne({
        where: { id: req.body.customerId }
    })
    sharp(req.file.buffer).resize({ width: 1000, height: 600, fit: 'inside' }).toFormat('webp').toBuffer()
        .then((resizedImageBuffer) => {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${req.file.originalname}`;
            const resizedImagePath = path.join('images', fileName);
            fs.writeFile(resizedImagePath, resizedImageBuffer, (error) => {
                if (error) {
                    return res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier' });
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
                    steps: req.body.steps,
                    company: customer.company,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    adress: customer.adress,
                    adress2: customer.adress2,
                    zipCode: customer.zipCode,
                    city: customer.city,
                    phone: customer.phone,
                    mail: customer.mail,
                    photo: `${req.protocol}://${req.get('host')}/images/${fileName}`
                })
                .then((prepRequest) => res.status(201).json(prepRequest))
                .catch((error) => {
                    if (req.file) {
                        if (fileName !== undefined) {
                            fs.unlink(`images/${fileName}`,
                                function (err) {
                                    if (err) {
                                        console.log('error');
                                    } else {
                                        console.log('fichier supprimé');
                                    }
                                }
                            )
                        }
                    }
                    res.status(400).json({ error })
                });
            })
        })
        .catch(error => res.status(500).json({ error }));
}

// Edit PrepRequest
exports.editPrepRequest = (req, res) => {
    // Empty Inputs
    if (req.body.immat === "" || req.body.immat === undefined ||
        req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
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
    .catch(error => res.status(400).json({ error }));
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
    .catch(error => res.status(400).json({ error }));
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
    .catch(error => res.status(400).json({ error }));
}

// Delete PrepRequest
exports.deletePrepRequest = (req, res) => {
    models.PrepRequests.findOne({ where: { id: req.params.id } })
    .then((prepR) => {
        if (prepR.photo) {
            let filename = prepR.photo.split('/images/')[1];
            if (filename !== undefined) {
                fs.unlink(`images/${filename}`,
                    function (err) {
                        if (err) {
                            console.log('error');
                        } else {
                            console.log('fichier supprimé');
                        }
                    }
                )
            }
        }
        prepR.destroy()
        .then(() => res.status(200).json({ message: 'Demande supprimée' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Get All Requests
exports.getAllRequests = async (req, res) => {
    let preps = await models.PrepRequests.findAll({ 
        where: { customerId: req.params.id },
        order: [['createdAt', 'ASC']]
    })
    let slots = await models.SlotRequests.findAll({ 
        where: { customerId: req.params.id },
        order: [['createdAt', 'ASC']]
    })
    res.status(200).json({preps, slots})
}

// Get One PrepRequest
exports.getOnePrepRequest = (req, res) => {
    models.PrepRequests.findOne({ where: { id: req.params.id}})
    .then(prepR => res.status(200).json(prepR))
    .catch(error => res.status(400).json({ error }));
}