const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accounts');

router.post('/add', accountCtrl.createAccount);
router.get('/', accountCtrl.getAllAccounts);
router.get('/customers', accountCtrl.getAllCustomers);
router.get('/employees', accountCtrl.getAllEmployees);

module.exports = router;