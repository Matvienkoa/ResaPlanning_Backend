const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accounts');

router.post('/add/employee', accountCtrl.createAccountEmployee);
router.post('/add/customer', accountCtrl.createAccountCustomer);
router.put('/edit/employee/:id', accountCtrl.editAccountEmployee);
router.put('/edit/customer/:id', accountCtrl.editAccountCustomer);
router.delete('/:id', accountCtrl.deleteAccount);
router.get('/:id', accountCtrl.getOneAccount);
router.get('/', accountCtrl.getAllAccounts);

module.exports = router;