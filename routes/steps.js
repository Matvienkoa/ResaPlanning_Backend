const express = require('express');
const router = express.Router();
const stepCtrl = require('../controllers/steps');
const { checkJWT, checkUser } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, stepCtrl.createStep);
router.post('/append', checkJWT, checkUser, stepCtrl.appendStep);
router.put('/:id', checkJWT, checkUser, stepCtrl.editStepType);
router.put('/state/:id', checkJWT, checkUser, stepCtrl.editStateStep);
router.delete('/:id', checkJWT, checkUser, stepCtrl.deleteStep);
router.get('/preparation/:id', checkJWT, checkUser, stepCtrl.getAllStepsByPrep);

module.exports = router;