const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employees');

router.get('/:id', employeeCtrl.getOneEmployee);
router.get('/', employeeCtrl.getAllEmployees);

module.exports = router;