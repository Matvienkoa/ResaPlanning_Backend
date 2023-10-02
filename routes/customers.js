const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customers');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, checkAdmin, customerCtrl.createCustomer);
router.put('/:id', checkJWT, checkUser, checkAdmin, customerCtrl.editCustomer);
router.delete('/:id', checkJWT, checkUser, checkAdmin, customerCtrl.deleteCustomer);
router.get('/:id', checkJWT, checkUser, customerCtrl.getOneCustomer);
router.get('/user/:id', checkJWT, checkUser, customerCtrl.getOneCustomerByUserId);
router.get('/', checkJWT, checkUser, customerCtrl.getAllCustomers);

module.exports = router;