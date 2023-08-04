const express = require('express');
const router = express.Router();
const stepCtrl = require('../controllers/steps');

router.post('/', stepCtrl.createStep);
router.put('/:id', stepCtrl.editStepType);
router.put('/state/:id', stepCtrl.editStateStep);
router.get('/preparation/:id', stepCtrl.getAllStepsByPrep);

module.exports = router;