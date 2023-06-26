const bcryptjs = require('bcryptjs');
const models = require('../models/Index');
const passwordValidator = require('../middleware/passwordValidator');
const emailValidator = require('email-validator');

// Create Account Employee
exports.createAccountEmployee = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.password === "" || req.body.password2 === "" || req.body.role === "" || req.body.firstName === "" ||
        req.body.login === undefined || req.body.password === undefined || req.body.password2 === undefined || req.body.role === undefined || req.body.firstName === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Bad Schema Password
    if (!passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    models.Users.findOne({
        where: { login: req.body.login }
    })
        .then((user) => {
            if (!user) {
                bcryptjs.hash(req.body.password, 10)
                    .then(hash => {
                        models.Users.create({
                            login: req.body.login,
                            password: hash,
                            role: req.body.role
                        })
                        .then((user) => {
                            models.Employees.create({
                                userId: user.id,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                            })
                            .then((employee) => res.status(201).json({ employee }))
                            .catch(error => res.status(400).json({ error }));
                        })
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(400).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
            }
        })
};

// Create Account Customer
exports.createAccountCustomer = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.password === "" || req.body.password2 === "" || req.body.role === "" || req.body.firstName === "" || req.body.phone === "" || req.body.mail === "" ||
        req.body.login === undefined || req.body.password === undefined || req.body.password2 === undefined || req.body.role === undefined || req.body.firstName === undefined || req.body.phone === undefined || req.body.mail === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Bad Schema Mail
    if (!emailValidator.validate(req.body.mail)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    // Bad Schema Password
    if (!passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    models.Users.findOne({
        where: { login: req.body.login }
    })
        .then((user) => {
            if (!user) {
                bcryptjs.hash(req.body.password, 10)
                    .then(hash => {
                        models.Users.create({
                            login: req.body.login,
                            password: hash,
                            role: req.body.role
                        })
                            .then((user) => {
                                if (user.role === 'customer') {
                                    models.Customers.create({
                                        userId: user.id,
                                        company: req.body.company,
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        adress: req.body.adress,
                                        adress2: req.body.adress2,
                                        zipCode: req.body.zipCode,
                                        city: req.body.city,
                                        phone: req.body.phone,
                                        mail: req.body.mail
                                    })
                                        .then((customer) => res.status(201).json({ customer }))
                                        .catch(error => res.status(400).json({ error }));
                                }
                            })
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(400).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
            }
        })
};

// Get One Account
exports.getOneAccount = (req, res) => {
    models.Users.findOne({ where: { id: req.params.id } })
    .then(account => res.status(200).json(account))
    .catch(error => res.status(400).json({ error }));
}

// Get All Accounts
exports.getAllAccounts = (req, res) => {
    models.Users.findAll({
        include: [{ model: models.Customers }, { model: models.Employees }]
    })
    .then((accounts) => res.status(200).json(accounts))
    .catch(error => res.status(400).json({ error }));
}

