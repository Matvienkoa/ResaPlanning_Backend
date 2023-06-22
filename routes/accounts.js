const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accounts');

router.post('/add', accountCtrl.createAccount);
router.get('/:id', accountCtrl.getOneAccount);
router.get('/', accountCtrl.getAllAccounts);

module.exports = router;