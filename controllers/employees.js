const models = require('../models/Index');

// Get One Employee
exports.getOneEmployee = (req, res) => {
    models.Employees.findOne({ where: { userId: req.params.id } })
        .then(employee => res.status(200).json(employee))
        .catch(error => res.status(400).json({ error }));
}

// Get All Employees
exports.getAllEmployees = (req, res) => {
    models.Employees.findAll()
        .then((employees) => res.status(200).json(employees))
        .catch(error => res.status(400).json({ error }));
}