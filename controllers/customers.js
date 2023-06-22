const models = require('../models/Index');

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