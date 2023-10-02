const express = require('express');
const router = express.Router();
const prepRequestCtrl = require('../controllers/prepRequests');
const multerImage = require('../middleware/multerImage');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, prepRequestCtrl.createPrepRequest);
router.post('/photo', checkJWT, checkUser, multerImage, prepRequestCtrl.createPrepRequestPhoto);
router.put('/:id', checkJWT, checkUser, prepRequestCtrl.editPrepRequest);
router.put('/validate/:id', checkJWT, checkUser, checkAdmin, prepRequestCtrl.validatePrepRequest);
router.put('/refuse/:id', checkJWT, checkUser, checkAdmin, prepRequestCtrl.refusePrepRequest);
router.delete('/:id', checkJWT, checkUser, prepRequestCtrl.deletePrepRequest);
router.get('/:id', checkJWT, checkUser, prepRequestCtrl.getAllRequests);
router.get('/one/:id', checkJWT, checkUser, prepRequestCtrl.getOnePrepRequest);

module.exports = router;