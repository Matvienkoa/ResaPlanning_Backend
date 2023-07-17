const models = require('../models/Index');
const fs = require('fs');

// Create Vehicle
exports.createVehicle = async (req, res) => {
    console.log(req.files)
    // Empty Inputs
    if (req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometers === "" || req.body.kilometers === undefined ||
        req.body.price === "" || req.body.price === undefined ||
        req.body.immat === "" || req.body.immat === undefined) {
        if (req.files) {
            req.files.forEach(file => {
                let filename = file.filename;
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
            });
        }
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires PD" });
    }
    // Same Immat
    const vehicleImmat = await models.Vehicles.findOne({
        where: {immat: req.body.immat}
    })
    if (vehicleImmat) {
        if (req.files) {
            req.files.forEach(file => {
                let filename = file.filename;
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
            });
        }
        return res.status(400).json({ message: "Ce véhicule existe déjà dans le showcase !" });
    }
    models.Vehicles.create({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        price: req.body.price,
        immat: req.body.immat,
        observations: req.body.observations,
        photo1: req.files[0] ?
        `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`
        : null,
        photo2: req.files[1] ?
        `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`
        : null,
        photo3: req.files[2] ?
        `${req.protocol}://${req.get('host')}/images/${req.files[2].filename}`
        : null,
        photo4: req.files[3] ?
        `${req.protocol}://${req.get('host')}/images/${req.files[3].filename}`
        : null,
    })
    .then((vehicle) => res.status(201).json(vehicle))
    .catch(error => res.status(400).json({ error }));
}

// Edit Vehicles Infos
exports.editVehicleInfos = async (req, res) => {
    if (req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometers === "" || req.body.kilometers === undefined ||
        req.body.price === "" || req.body.price === undefined ||
        req.body.immat === "" || req.body.immat === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Same Immat
    const vehicleImmat = await models.Vehicles.findOne({ where: { immat: req.body.immat } })
    if (vehicleImmat && vehicleImmat.id !== JSON.parse(req.params.id)) {
        return res.status(400).json({ message: "Ce véhicule existe déjà dans le showcase !" });
    }
    models.Vehicles.findOne({ where: { id: req.params.id } })
    .then((vehicle) => {
        vehicle.update({
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            kilometers: req.body.kilometers,
            price: req.body.price,
            immat: req.body.immat,
            observations: req.body.observations
        })
        .then((vehicle) => res.status(201).json(vehicle))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Edit Photo Vehicle
exports.editVehiclePhoto = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Merci d'ajouter un fichier" });
    }
    models.Vehicles.findOne({ where: { id: req.params.id } })
    .then((vehicle) => {
        switch (req.body.numberPhoto) {
            case 'photo1':
                if (vehicle.photo1 !== null) {
                    let filename = vehicle.photo1.split('/images/')[1];
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
                vehicle.update({
                    photo1: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                .then((vehicle) => res.status(201).json(vehicle))
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
                if (vehicle.photo2 !== null) {
                    let filename = vehicle.photo2.split('/images/')[1];
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
                vehicle.update({
                    photo2: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                .then((vehicle) => res.status(201).json(vehicle))
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
                if (vehicle.photo3 !== null) {
                    let filename = vehicle.photo3.split('/images/')[1];
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
                vehicle.update({
                    photo3: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                .then((vehicle) => res.status(201).json(vehicle))
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
                if (vehicle.photo4 !== null) {
                    let filename = vehicle.photo4.split('/images/')[1];
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
                vehicle.update({
                    photo4: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                .then((vehicle) => res.status(201).json(vehicle))
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
}

// Get All Vehicles
exports.getAllVehicles = (req, res) => {
    models.Vehicles.findAll({
        order: [['createdAt', 'ASC']]
    })
    .then((vehicles) => res.status(200).json(vehicles))
    .catch(error => res.status(400).json({ error }));
}

// Get One Vehicle
exports.getOneVehicle = (req, res) => {
    models.Vehicles.findOne({
        where: { id: req.params.id }
    })
    .then(vehicle => res.status(200).json(vehicle))
    .catch(error => res.status(400).json({ error }));
}