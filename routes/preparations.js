const express = require('express');
const router = express.Router();
const preparationCtrl = require('../controllers/preparations');
const multerImage = require('../middleware/multerImage');

router.post('/', preparationCtrl.createPreparation);
router.get('/start/:start/end/:end', preparationCtrl.getAllPreparations);
router.get('/customer/:customerId', preparationCtrl.getAllPreparationsCustomer);
router.get('/:id', preparationCtrl.getOnePreparation);
router.put('/:id', preparationCtrl.editPreparation);
router.put('/photo/:id', multerImage, preparationCtrl.addPhoto);
router.put('/photo/delete/:id', preparationCtrl.deletePhoto);
router.put('/drop/:id', preparationCtrl.dropPreparation);
router.put('/size/:id', preparationCtrl.sizePreparation);
router.put('/validate/:id', preparationCtrl.validatePreparation);
router.put('/invalidate/:id', preparationCtrl.invalidatePreparation);
router.put('/invoice/:id', preparationCtrl.invoicePreparation);
router.delete('/:id', preparationCtrl.deletePreparation);

module.exports = router;