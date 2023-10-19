const express = require('express');
const router = express.Router();
const preparationCtrl = require('../controllers/preparations');
const multerImage = require('../middleware/multerImage');
const { checkJWT, checkUser } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, preparationCtrl.createPreparation);
router.get('/start/:start/end/:end', checkJWT, checkUser, preparationCtrl.getAllPreparations);
router.get('/customer/:customerId', checkJWT, checkUser, preparationCtrl.getAllPreparationsCustomerPlanned);
router.get('/customer/:customerId/date/:date', checkJWT, checkUser, preparationCtrl.getAllPreparationsCustomerCompleted);
router.get('/:id', checkJWT, checkUser, preparationCtrl.getOnePreparation);
router.get('/slot/:slotId', checkJWT, checkUser, preparationCtrl.getAllPreparationsSlot);
router.put('/:id', checkJWT, checkUser, preparationCtrl.editPreparation);
router.put('/photo/:id', checkJWT, checkUser, multerImage, preparationCtrl.addPhoto);
router.put('/photo/delete/:id', checkJWT, checkUser, preparationCtrl.deletePhoto);
router.put('/drop/:id', checkJWT, checkUser, preparationCtrl.dropPreparation);
router.put('/size/:id', checkJWT, checkUser, preparationCtrl.sizePreparation);
router.put('/validate/:id', checkJWT, checkUser, preparationCtrl.validatePreparation);
router.put('/invalidate/:id', checkJWT, checkUser, preparationCtrl.invalidatePreparation);
router.put('/invoice/:id', checkJWT, checkUser, preparationCtrl.invoicePreparation);
router.delete('/:id', checkJWT, checkUser, preparationCtrl.deletePreparation);

module.exports = router;