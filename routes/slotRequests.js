const express = require('express');
const router = express.Router();
const slotRequestCtrl = require('../controllers/slotRequests');

router.post('/', slotRequestCtrl.createSlotRequest);
router.put('/:id', slotRequestCtrl.editSlotRequest);
router.put('/validate/:id', slotRequestCtrl.validateSlotRequest);
router.put('/refuse/:id', slotRequestCtrl.refuseSlotRequest);
router.delete('/:id', slotRequestCtrl.deleteSlotRequest);
router.get('/:id', slotRequestCtrl.getOneSlotRequest);

module.exports = router;