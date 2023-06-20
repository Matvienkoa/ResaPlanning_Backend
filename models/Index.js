const Users = require('./Users');
const Employees = require('./Employees');
const Customers = require('./Customers');

Users.hasMany(Employees);
Users.hasMany(Customers);
Employees.belongsTo(Users);
Customers.belongsTo(Users);

module.exports = {
    Users,
    Employees,
    Customers,
}