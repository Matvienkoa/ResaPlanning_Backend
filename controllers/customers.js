const models = require('../models/Index');
const emailValidator = require('email-validator');

// Create Customer
exports.createCustomer = async (req, res) => {
    // Empty Inputs
    if (req.body.company === "" || req.body.phone === "" || req.body.mail === "" ||
        req.body.company === undefined || req.body.phone === undefined || req.body.mail === undefined) {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires" });
    }
    // Bad Schema Mail
    if (!emailValidator.validate(req.body.mail)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    models.Customers.create({
        company: req.body.company,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        adress: req.body.adress,
        adress2: req.body.adress2,
        zipCode: req.body.zipCode,
        city: req.body.city,
        phone: req.body.phone,
        mail: req.body.mail,
        account: 'no'
    })
    .then((customer) => res.status(201).json(customer))
    .catch(error => res.status(400).json({ error }));
};

// Get One Customer
exports.getOneCustomer = (req, res) => {
    models.Customers.findOne({ where: { userId: req.params.id } })
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(400).json({ error }));
}

// Get All Customers
exports.getAllCustomers = (req, res) => {
    models.Customers.findAll()
        .then((customers) => res.status(200).json(customers))
        .catch(error => res.status(400).json({ error }));
}