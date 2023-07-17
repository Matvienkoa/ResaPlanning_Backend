const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customers');

router.post('/', customerCtrl.createCustomer);
router.get('/:id', customerCtrl.getOneCustomerByUserId);
router.get('/profile/:id', customerCtrl.getOneCustomer);
router.get('/', customerCtrl.getAllCustomers);

module.exports = router;