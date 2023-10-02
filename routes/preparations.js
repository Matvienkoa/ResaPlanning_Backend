const express = require('express');
const router = express.Router();
const preparationCtrl = require('../controllers/preparations');
const multerImage = require('../middleware/multerImage');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, checkAdmin, preparationCtrl.createPreparation);
router.get('/start/:start/end/:end', checkJWT, checkUser, checkAdmin, preparationCtrl.getAllPreparations);
router.get('/customer/:customerId', checkJWT, checkUser, preparationCtrl.getAllPreparationsCustomerPlanned);
router.get('/customer/:customerId/date/:date', checkJWT, checkUser, preparationCtrl.getAllPreparationsCustomerCompleted);
router.get('/:id', checkJWT, checkUser, preparationCtrl.getOnePreparation);
router.put('/:id', checkJWT, checkUser, preparationCtrl.editPreparation);
router.put('/photo/:id', checkJWT, checkUser, checkAdmin, multerImage, preparationCtrl.addPhoto);
router.put('/photo/delete/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.deletePhoto);
router.put('/drop/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.dropPreparation);
router.put('/size/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.sizePreparation);
router.put('/validate/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.validatePreparation);
router.put('/invalidate/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.invalidatePreparation);
router.put('/invoice/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.invoicePreparation);
router.delete('/:id', checkJWT, checkUser, checkAdmin, preparationCtrl.deletePreparation);

module.exports = router;