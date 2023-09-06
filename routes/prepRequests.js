const express = require('express');
const router = express.Router();
const prepRequestCtrl = require('../controllers/prepRequests');

router.post('/', prepRequestCtrl.createPrepRequest);
router.put('/:id', prepRequestCtrl.editPrepRequest);
router.put('/validate/:id', prepRequestCtrl.validatePrepRequest);
router.put('/refuse/:id', prepRequestCtrl.refusePrepRequest);
router.delete('/:id', prepRequestCtrl.deletePrepRequest);
router.get('/:id', prepRequestCtrl.getAllRequests);
router.get('/one/:id', prepRequestCtrl.getOnePrepRequest);

module.exports = router;