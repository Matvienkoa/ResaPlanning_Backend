const bcryptjs = require('bcryptjs');
const models = require('../models/Index');
const passwordValidator = require('../middleware/passwordValidator');

// Create Account Employee
exports.createAccountEmployee = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.password === "" || req.body.password2 === "" || req.body.firstName === "" || req.body.privileges === "" || req.body.privilegesM === "" ||
        req.body.login === undefined || req.body.password === undefined || req.body.password2 === undefined || req.body.firstName === undefined || req.body.privileges === undefined || req.body.privilegesM === undefined) {
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
                        role: 'employee',
                        afc: 'yes',
                        millenium: 'yes'
                    })
                    .then((user) => {
                        models.Employees.create({
                            userId: user.id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            privileges: req.body.privileges,
                            privilegesM: req.body.privilegesM
                        })
                        .then((employee) => res.status(201).json(employee))
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(409).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
        }
    })
    .catch(error => res.status(400).json({ error }));
};

// Create Account Customer
exports.createAccountCustomer = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.password === "" || req.body.password2 === "" || req.body.afc === "" || req.body.millenium === "" ||
        req.body.login === undefined || req.body.password === undefined || req.body.password2 === undefined || req.body.afc === undefined || req.body.millenium === undefined) {
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
    // Check if customer is and have account
    const customer = await models.Customers.findOne({
        where: { id: req.body.id }
    })
    if (!customer) {
        return res.status(400).json({ message: "Merci de sélectionner un client existant" });
    }
    if (customer.account === 'yes') {
        return res.status(409).json({ message: "Ce client a déjà un compte de connexion" });
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
                        role: 'customer',
                        afc: req.body.afc,
                        millenium: req.body.millenium
                    })
                    .then((user) => {
                        customer.update({
                            userId: user.id,
                            account: 'yes'
                        })
                        .then((newCustomer) => res.status(201).json({ newCustomer }))
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(409).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
        }
    })
    .catch(error => res.status(400).json({ error }));
};

// Edit Account Employee
exports.editAccountEmployee = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.firstName === "" || req.body.privileges === "" || req.body.privilegesM === "" ||
        req.body.login === undefined || req.body.firstName === undefined || req.body.privileges === undefined || req.body.privilegesM === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Bad Schema Password
    if (req.body.password && !passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password && req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    const userLogin = await models.Users.findOne({ where: { login: req.body.login } })
    if (userLogin && userLogin.id !== JSON.parse(req.params.id)) {
        return res.status(409).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
    }
    models.Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
        if(req.body.password === "" || req.body.password === null || req.body.password === undefined) {
            user.update({
                login: req.body.login
            })
            .then((newUser) => {
                models.Employees.findOne({ where: {userId: newUser.id }})
                .then((employee) => {
                    employee.update({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        privileges: req.body.privileges,
                        privilegesM: req.body.privilegesM
                    })
                    .then((employee) => res.status(201).json(employee))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(400).json({ error }));
        } else {
            bcryptjs.hash(req.body.password, 10)
            .then(hash => {
                user.update({
                    login: req.body.login,
                    password: hash
                })
                .then((newUser) => {
                    models.Employees.findOne({ where: { userId: newUser.id } })
                        .then((employee) => {
                            employee.update({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                privileges: req.body.privileges
                            })
                            .then((employee) => res.status(201).json(employee))
                            .catch(error => res.status(400).json({ error }));
                        })
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(400).json({ error }));
}

// Edit Account Customer
exports.editAccountCustomer = async (req, res) => {
    // Empty Inputs
    if (req.body.login === "" || req.body.afc === "" || req.body.millenium === "" || req.body.login === undefined || req.body.afc === undefined || req.body.millenium === undefined) {
        return res.status(400).json({ message: "Merci de renseigner un identifiant" });
    }
    // Bad Schema Password
    if (req.body.password && !passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password && req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    const userLogin = await models.Users.findOne({ where: { login: req.body.login } })
    if (userLogin && userLogin.id !== JSON.parse(req.params.id)) {
        return res.status(409).json({ message: "Cet identifiant existe déjà, merci d'en choisir un autre" });
    }
    models.Users.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (req.body.password === "" || req.body.password === null || req.body.password === undefined) {
                user.update({
                    login: req.body.login,
                    afc: req.body.afc,
                    millenium: req.body.millenium
                })
                .then((newUser) => res.status(201).json(newUser))
                .catch(error => res.status(400).json({ error }));
            } else {
                bcryptjs.hash(req.body.password, 10)
                    .then(hash => {
                        user.update({
                            login: req.body.login,
                            password: hash,
                            afc: req.body.afc,
                            millenium: req.body.millenium
                        })
                        .then((newUser) => res.status(201).json(newUser))
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
}

// Delete Account
exports.deleteAccount = (req, res) => {
    models.Users.findOne({ where: { id: req.params.id } })
    .then(user => {
        if(user.role === 'employee') {
            models.Employees.findOne({ where: { userId: user.id } })
            .then(employee => {
                employee.destroy()
                user.destroy()
            })
            .then(() => res.status(200).json({ message: 'Compte supprimé' }))
            .catch(error => res.status(400).json({ error }));
        }
        if(user.role === 'customer') {
            models.Customers.findOne({ where: { userId: user.id } })
            .then(customer => {
                customer.update({
                    userId: null,
                    account: 'no'
                })
                .then(() => {
                    user.destroy()
                })
            })
            .then(() => res.status(200).json({ message: 'Compte supprimé' }))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(400).json({ error }));
}

// Get One Account
exports.getOneAccount = (req, res) => {
    models.Users.findOne({ where: { id: req.params.id } })
    .then(account => res.status(200).json(account))
    .catch(error => res.status(400).json({ error }));
}

// Get All Accounts
exports.getAllAccounts = (req, res) => {
    models.Users.findAll()
    .then((accounts) => res.status(200).json(accounts))
    .catch(error => res.status(400).json({ error }));
}


