const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accounts');

router.post('/add', accountCtrl.createAccount);
router.get('/:id', accountCtrl.getOneAccount);
router.get('/', accountCtrl.getAllAccounts);
router.get('/customer/:id', accountCtrl.getOneCustomer);
router.get('/customers', accountCtrl.getAllCustomers);
router.get('/employee/:id', accountCtrl.getOneEmployee);
router.get('/employees', accountCtrl.getAllEmployees);

module.exports = router;