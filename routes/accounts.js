const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accounts');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/add/employee', checkJWT, checkUser, checkAdmin, accountCtrl.createAccountEmployee);
router.post('/add/customer', checkJWT, checkUser, checkAdmin, accountCtrl.createAccountCustomer);
router.put('/edit/employee/:id', checkJWT, checkUser, checkAdmin, accountCtrl.editAccountEmployee);
router.put('/edit/customer/:id', checkJWT, checkUser, checkAdmin, accountCtrl.editAccountCustomer);
router.delete('/:id', checkJWT, checkUser, checkAdmin, accountCtrl.deleteAccount);
router.get('/:id', checkJWT, checkUser, accountCtrl.getOneAccount);
router.get('/', checkJWT, checkUser, accountCtrl.getAllAccounts);

module.exports = router;