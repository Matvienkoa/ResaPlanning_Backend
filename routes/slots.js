const express = require('express');
const router = express.Router();
const slotCtrl = require('../controllers/slots');

router.post('/', slotCtrl.createSlot);
router.put('/:id', slotCtrl.editSlot);
router.put('/drop/:id', slotCtrl.dropSlot);
router.put('/size/:id', slotCtrl.sizeSlot);
router.delete('/:id', slotCtrl.deleteSlot);
router.get('/', slotCtrl.getAllSlots);
router.get('/:id', slotCtrl.getOneSlot);

module.exports = router;