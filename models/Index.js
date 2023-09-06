const Users = require('./Users');
const Employees = require('./Employees');
const Customers = require('./Customers');
const Preparations = require('./Preparations');
const Steps = require('./Steps');
const Vehicles = require('./Vehicles');
const Slots = require('./Slots');
const PrepRequests = require('./PrepRequests');
const SlotRequests = require('./SlotRequests');

Preparations.hasMany(Steps);
Steps.belongsTo(Preparations);

module.exports = {
    Users,
    Employees,
    Customers,
    Preparations,
    Steps,
    Vehicles,
    Slots,
    PrepRequests,
    SlotRequests
}