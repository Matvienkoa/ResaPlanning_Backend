const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employees');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.get('/:id', checkJWT, checkUser, checkAdmin, employeeCtrl.getOneEmployee);
router.get('/user/:id', checkJWT, checkUser, checkAdmin, employeeCtrl.getOneEmployeeByUserId);
router.get('/', checkJWT, checkUser, checkAdmin, employeeCtrl.getAllEmployees);

module.exports = router;