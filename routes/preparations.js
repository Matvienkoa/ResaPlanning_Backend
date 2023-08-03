const express = require('express');
const router = express.Router();
const preparationCtrl = require('../controllers/preparations');

router.post('/', preparationCtrl.createPreparation);
router.get('/', preparationCtrl.getAllPreparations);
router.get('/:id', preparationCtrl.getOnePreparation);
router.put('/:id', preparationCtrl.editPreparation);

module.exports = router;