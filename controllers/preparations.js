const models = require('../models/Index');
const fs = require('fs');
var moment = require('moment');
moment.locale('fr'); 

// Create Preparation
exports.createPreparation = (req, res) => {
    console.log(req.body)
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
        observationsCustomer: req.body.observationsCustomer,
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

// Add Photo to Preparation
exports.addPhoto = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Merci d'ajouter un fichier" });
    }
    console.log(req.file, req.body)
    models.Preparations.findOne({ where: { id: req.params.id } })
        .then((preparation) => {
            // const protocol = req.protocol === 'https' ? 'https' : 'http';
            switch (req.body.numberPhoto) {
                case 'photo1':
                    if (preparation.photo1 !== null) {
                        let filename = preparation.photo1.split('/images/')[1];
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
                    preparation.update({
                        photo1: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch((error) => {
                            if (req.file) {
                                let filename = req.file.filename;
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
                            res.status(400).json({ error })
                        });
                    break;
                case 'photo2':
                    console.log(preparation.photo2)
                    if (preparation.photo2 !== null) {
                        let filename = preparation.photo2.split('/images/')[1];
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
                    preparation.update({
                        photo2: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch((error) => {
                            if (req.file) {
                                let filename = req.file.filename;
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
                            res.status(400).json({ error })
                        });
                    break;
                case 'photo3':
                    if (preparation.photo3 !== null) {
                        let filename = preparation.photo3.split('/images/')[1];
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
                    preparation.update({
                        photo3: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch((error) => {
                            if (req.file) {
                                let filename = req.file.filename;
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
                            res.status(400).json({ error })
                        });
                    break;
                case 'photo4':
                    if (preparation.photo4 !== null) {
                        let filename = preparation.photo4.split('/images/')[1];
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
                    preparation.update({
                        photo4: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch((error) => {
                            if (req.file) {
                                let filename = req.file.filename;
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
                            res.status(400).json({ error })
                        });
                    break;
            }
        })
        .catch(error => res.status(400).json({ error }));
}

// Delete Photo Preparation
exports.deletePhoto = (req, res) => {
    if (req.body.numberPhoto === '' || req.body.numberPhoto === undefined) {
        return res.status(400).json({ message: "Un problème est survenu, veuillez réessayer ultérieurement" });
    }
    models.Preparations.findOne({ where: { id: req.params.id } })
        .then((preparation) => {
            switch (req.body.numberPhoto) {
                case 'photo1':
                    if (preparation.photo1 !== null) {
                        let filename = preparation.photo1.split('/images/')[1];
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
                    preparation.update({
                        photo1: null
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch(error => res.status(400).json({ error }));
                    break;
                case 'photo2':
                    if (preparation.photo2 !== null) {
                        let filename = preparation.photo2.split('/images/')[1];
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
                    preparation.update({
                        photo2: null
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch(error => res.status(400).json({ error }));
                    break;
                case 'photo3':
                    if (preparation.photo3 !== null) {
                        let filename = preparation.photo3.split('/images/')[1];
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
                    preparation.update({
                        photo3: null
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch(error => res.status(400).json({ error }));
                    break;
                case 'photo4':
                    if (preparation.photo4 !== null) {
                        let filename = preparation.photo4.split('/images/')[1];
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
                    preparation.update({
                        photo4: null
                    })
                        .then((preparation) => res.status(201).json(preparation))
                        .catch(error => res.status(400).json({ error }));
                    break;
            }
        })
        .catch(error => res.status(400).json({ error }));
}

// Drop Preparation
exports.dropPreparation = (req, res) => {
    // Empty Inputs
    if (req.body.deltaD === "" || req.body.deltaD === undefined || req.body.deltaD === null ||
        req.body.deltaM === "" || req.body.deltaM === undefined || req.body.deltaM === null) {
        return res.status(400).json({ message: "Un problème est survenu!" });
    }
    models.Preparations.findOne({ where: { id: req.params.id } })
    .then((preparation) => {
        preparation.update({
            start: moment(preparation.start).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds'),
            end: moment(preparation.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds')
        })
        .then((newPreparation) => res.status(201).json(newPreparation))
        .catch(error => res.status(400).json({ error }));
    })
}

// Size Preparation
exports.sizePreparation = (req, res) => {
    // Empty Inputs
    if (req.body.deltaD === "" || req.body.deltaD === undefined || req.body.deltaD === null ||
        req.body.deltaM === "" || req.body.deltaM === undefined || req.body.deltaM === null) {
        return res.status(400).json({ message: "Un problème est survenu!" });
    }
    models.Preparations.findOne({ where: { id: req.params.id } })
        .then((preparation) => {
            preparation.update({
                end: moment(preparation.end).add(req.body.deltaD, 'days').add(req.body.deltaM, 'milliseconds')
            })
                .then((newPreparation) => res.status(201).json(newPreparation))
                .catch(error => res.status(400).json({ error }));
        })
}

// Validate Preparation
exports.validatePreparation = (req, res) => {
    models.Preparations.findOne({ where: { id: req.params.id } })
    .then((preparation) => {
        preparation.update({
            state: 'completed'
        })
        .then((newPrep) => {
            models.Steps.findAll({ where: { preparationId: newPrep.id } })
            .then((steps) => {
                steps.forEach(step => {
                    step.update({
                        state: 'completed'
                    })
                })
            })
            res.status(201).json(newPrep)
        })
        .catch(error => res.status(400).json({ error }));
    })
}

// Invalidate Preparation
exports.invalidatePreparation = (req, res) => {
    models.Preparations.findOne({ where: { id: req.params.id } })
        .then((preparation) => {
            preparation.update({
                state: 'planned'
            })
                .then((newPrep) => {
                    models.Steps.findAll({ where: { preparationId: newPrep.id } })
                        .then((steps) => {
                            steps.forEach(step => {
                                step.update({
                                    state: 'planned'
                                })
                            })
                        })
                    res.status(201).json(newPrep)
                })
                .catch(error => res.status(400).json({ error }));
        })
}

// Invoice Preparation
exports.invoicePreparation = (req, res) => {
    models.Preparations.findOne({ where: { id: req.params.id } })
    .then((prep) => {
        prep.update({
            billed: 'yes'
        })
        .then((prepBilled) => res.status(201).json(prepBilled))
        .catch(error => res.status(400).json({ error }));
    })
}

// Delete Preparation
exports.deletePreparation = (req, res) => {
    models.Preparations.findOne({ where: { id: req.params.id } })
    .then((preparation) => {
        if(preparation.photo1) {
            let filename = preparation.photo1.split('/images/')[1];
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
        if (preparation.photo2) {
            let filename = preparation.photo2.split('/images/')[1];
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
        if (preparation.photo3) {
            let filename = preparation.photo3.split('/images/')[1];
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
        if (preparation.photo4) {
            let filename = preparation.photo4.split('/images/')[1];
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
        models.Steps.findAll({ where: {preparationId: preparation.id}})
        .then((steps) => {
            steps.forEach(step => {
                step.destroy()
            })
            preparation.destroy()
            .then(() => res.status(200).json({ message: 'Préparation supprimée' }))
            .catch(error => res.status(400).json({ error }));
        })
    })
}

// Get All Preparations
exports.getAllPreparations = (req, res) => {
    models.Preparations.findAll()
    .then((preparations) => res.status(200).json(preparations))
    .catch(error => res.status(400).json({ error }));
}

// Get All Preparations Customer
exports.getAllPreparationsCustomer = async (req, res) => {
    let prepsPlanned = await models.Preparations.findAll({ where: { customerId: req.params.customerId, state: 'planned'}})
    let prepsCompleted = await models.Preparations.findAll({ where: { customerId: req.params.customerId, state: 'completed' } })
    res.status(200).json({ prepsPlanned, prepsCompleted })
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