const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customers');

router.post('/', customerCtrl.createCustomer);
router.put('/:id', customerCtrl.editCustomer);
router.delete('/:id', customerCtrl.deleteCustomer);
router.get('/:id', customerCtrl.getOneCustomer);
router.get('/user/:id', customerCtrl.getOneCustomerByUserId);
router.get('/', customerCtrl.getAllCustomers);

module.exports = router;