const models = require('../models/Index');
const fs = require('fs').promises;
const sharp = require('sharp');
const path = require('path');

// Create Vehicle
exports.createVehicle = async (req, res) => {
    // Empty Inputs
    if (req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometers === "" || req.body.kilometers === undefined ||
        req.body.marketPrice === "" || req.body.marketPrice === undefined || req.body.marketPrice === null ||
        req.body.publicPrice === "" || req.body.publicPrice === undefined || req.body.publicPrice === null ||
        req.body.purchasePrice === "" || req.body.purchasePrice === undefined || req.body.purchasePrice === null ||
        req.body.firstHand === "" || req.body.firstHand === undefined ||
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
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
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
        return res.status(409).json({ message: "Ce véhicule existe déjà dans le showroom !" });
    }
    const imgs = [];
    const promises = req.files.map(file => {
        return sharp(file.buffer)
            .resize({ width: 1000, height: 600, fit: 'inside' })
            .toFormat('webp')
            .toBuffer()
            .then((resizedImageBuffer) => {
                const timestamp = Date.now();
                const fileName = `${timestamp}_${file.originalname}`;
                const resizedImagePath = path.join('images', fileName);
                return fs.writeFile(resizedImagePath, resizedImageBuffer)
                    .then(() => {
                        imgs.push(fileName);
                    });
            });
    });
    Promise.all(promises)
        .then(() => {
            console.log('Tous les fichiers ont été traités avec succès.');
            console.log('Noms des fichiers redimensionnés :', imgs);
            models.Vehicles.create({
                brand: req.body.brand,
                model: req.body.model,
                year: req.body.year,
                kilometers: req.body.kilometers * 100,
                marketPrice: req.body.marketPrice * 100,
                publicPrice: req.body.publicPrice * 100,
                purchasePrice: req.body.purchasePrice * 100,
                frevos: req.body.frevos,
                frevosPrice: req.body.frevosPrice * 100,
                firstHand: req.body.firstHand,
                immat: req.body.immat,
                observations: req.body.observations,
                photo1: imgs[0] ?
                    `${req.protocol}://${req.get('host')}/images/${imgs[0]}`
                    : null,
                photo2: imgs[1] ?
                    `${req.protocol}://${req.get('host')}/images/${imgs[1]}`
                    : null,
                photo3: imgs[2] ?
                    `${req.protocol}://${req.get('host')}/images/${imgs[2]}`
                    : null,
                photo4: imgs[3] ?
                    `${req.protocol}://${req.get('host')}/images/${imgs[3]}`
                    : null,
            })
                .then((vehicle) => res.status(201).json(vehicle))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.error('Erreur lors du traitement des fichiers :', error);
            res.status(500).json({ error: 'Erreur lors du traitement des fichiers' });
        });
}

// Edit Vehicles Infos
exports.editVehicleInfos = async (req, res) => {
    if (req.body.brand === "" || req.body.brand === undefined ||
        req.body.model === "" || req.body.model === undefined ||
        req.body.year === "" || req.body.year === undefined ||
        req.body.kilometers === "" || req.body.kilometers === undefined ||
        req.body.marketPrice === "" || req.body.marketPrice === undefined || req.body.marketPrice === null ||
        req.body.publicPrice === "" || req.body.publicPrice === undefined || req.body.publicPrice === null ||
        req.body.purchasePrice === "" || req.body.purchasePrice === undefined || req.body.purchasePrice === null ||
        req.body.firstHand === "" || req.body.firstHand === undefined ||
        req.body.immat === "" || req.body.immat === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Same Immat
    const vehicleImmat = await models.Vehicles.findOne({ where: { immat: req.body.immat } })
    if (vehicleImmat && vehicleImmat.id !== JSON.parse(req.params.id)) {
        return res.status(409).json({ message: "Ce véhicule existe déjà dans le showroom !" });
    }
    models.Vehicles.findOne({ where: { id: req.params.id } })
    .then((vehicle) => {
        vehicle.update({
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            kilometers: req.body.kilometers,
            marketPrice: req.body.marketPrice * 100,
            publicPrice: req.body.publicPrice * 100,
            purchasePrice: req.body.purchasePrice * 100,
            frevos: req.body.frevos,
            frevosPrice: req.body.frevosPrice * 100,
            firstHand: req.body.firstHand,
            immat: req.body.immat,
            observations: req.body.observations
        })
        .then((vehicle) => res.status(201).json(vehicle))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Edit Photo Vehicle
exports.editVehiclePhoto = async (req, res) => {
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
                    vehicle.update({
                        photo1: null
                    })
                }
                sharp(req.file.buffer).resize({width: 1000, height: 600, fit: 'inside'}).toFormat('webp').toBuffer()
                .then((resizedImageBuffer) => {
                    const timestamp = Date.now();
                    const fileName = `${timestamp}_${req.file.originalname}`;
                    const resizedImagePath = path.join('images', fileName)
                    fs.writeFile(resizedImagePath, resizedImageBuffer)
                    .then(() => {
                        vehicle.update({
                            photo1: `${req.protocol}://${req.get('host')}/images/${fileName}`
                        })
                        .then((vehicle) => res.status(201).json(vehicle))
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
                    .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
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
                    vehicle.update({
                        photo2: null
                    })
                }
                sharp(req.file.buffer).resize({ width: 1000, height: 600, fit: 'inside' }).toFormat('webp').toBuffer()
                .then((resizedImageBuffer) => {
                    const timestamp = Date.now();
                    const fileName = `${timestamp}_${req.file.originalname}`;
                    const resizedImagePath = path.join('images', fileName)
                    fs.writeFile(resizedImagePath, resizedImageBuffer)
                        .then(() => {
                            vehicle.update({
                                photo2: `${req.protocol}://${req.get('host')}/images/${fileName}`
                            })
                                .then((vehicle) => res.status(201).json(vehicle))
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
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
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
                    vehicle.update({
                        photo3: null
                    })
                }
                sharp(req.file.buffer).resize({ width: 1000, height: 600, fit: 'inside' }).toFormat('webp').toBuffer()
                .then((resizedImageBuffer) => {
                    const timestamp = Date.now();
                    const fileName = `${timestamp}_${req.file.originalname}`;
                    const resizedImagePath = path.join('images', fileName)
                    fs.writeFile(resizedImagePath, resizedImageBuffer)
                        .then(() => {
                            vehicle.update({
                                photo3: `${req.protocol}://${req.get('host')}/images/${fileName}`
                            })
                                .then((vehicle) => res.status(201).json(vehicle))
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
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
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
                    vehicle.update({
                        photo4: null
                    })
                }
                sharp(req.file.buffer).resize({ width: 1000, height: 600, fit: 'inside' }).toFormat('webp').toBuffer()
                .then((resizedImageBuffer) => {
                    const timestamp = Date.now();
                    const fileName = `${timestamp}_${req.file.originalname}`;
                    const resizedImagePath = path.join('images', fileName)
                    fs.writeFile(resizedImagePath, resizedImageBuffer)
                        .then(() => {
                            vehicle.update({
                                photo4: `${req.protocol}://${req.get('host')}/images/${fileName}`
                            })
                                .then((vehicle) => res.status(201).json(vehicle))
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
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
                break;
        }
    })
    .catch(error => res.status(400).json({ error }));
}

// Delete Photo Vehicle
exports.deleteVehiclePhoto = (req, res) => {
    if (req.body.numberPhoto === '' || req.body.numberPhoto === undefined) {
        return res.status(400).json({ message: "Un problème est survenu, veuillez réessayer ultérieurement" });
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
                        photo1: null
                    })
                    .then((vehicle) => res.status(201).json(vehicle))
                    .catch(error => res.status(400).json({ error }));
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
                        photo2: null
                    })
                    .then((vehicle) => res.status(201).json(vehicle))
                    .catch(error => res.status(400).json({ error }));
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
                        photo3: null
                    })
                    .then((vehicle) => res.status(201).json(vehicle))
                    .catch(error => res.status(400).json({ error }));
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
                        photo4: null
                    })
                    .then((vehicle) => res.status(201).json(vehicle))
                    .catch(error => res.status(400).json({ error }));
                    break;
            }
        })
        .catch(error => res.status(400).json({ error }));
}

// Delete Vehicle
exports.deleteVehicle = (req, res) => {
    models.Vehicles.findOne({ where: { id: req.params.id } })
    .then((vehicle) => {
        if (vehicle.photo1) {
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
        if (vehicle.photo2) {
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
        if (vehicle.photo3) {
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
        if (vehicle.photo4) {
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
        vehicle.destroy()
        .then(() => res.status(200).json({ message: 'Véhicule supprimé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// Get All Vehicles
exports.getAllVehicles = (req, res) => {
    models.Vehicles.findAll({
        order: [['createdAt', 'DESC']]
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