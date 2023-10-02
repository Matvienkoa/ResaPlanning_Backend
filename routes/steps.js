const express = require('express');
const router = express.Router();
const stepCtrl = require('../controllers/steps');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, checkAdmin, stepCtrl.createStep);
router.post('/append', checkJWT, checkUser, stepCtrl.appendStep);
router.put('/:id', checkJWT, checkUser, checkAdmin, stepCtrl.editStepType);
router.put('/state/:id', checkJWT, checkUser, checkAdmin, stepCtrl.editStateStep);
router.delete('/:id', checkJWT, checkUser, checkAdmin, stepCtrl.deleteStep);
router.get('/preparation/:id', checkJWT, checkUser, stepCtrl.getAllStepsByPrep);

module.exports = router;