const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accounts');

router.post('/add/employee', accountCtrl.createAccountEmployee);
router.get('/:id', accountCtrl.getOneAccount);
router.get('/', accountCtrl.getAllAccounts);

module.exports = router;