const express = require('express');
const router = express.Router();
const slotRequestCtrl = require('../controllers/slotRequests');
const { checkJWT, checkUser } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, slotRequestCtrl.createSlotRequest);
router.put('/:id', checkJWT, checkUser, slotRequestCtrl.editSlotRequest);
router.put('/validate/:id', checkJWT, checkUser, slotRequestCtrl.validateSlotRequest);
router.put('/refuse/:id', checkJWT, checkUser, slotRequestCtrl.refuseSlotRequest);
router.delete('/:id', checkJWT, checkUser, slotRequestCtrl.deleteSlotRequest);
router.get('/:id', checkJWT, checkUser, slotRequestCtrl.getOneSlotRequest);

module.exports = router;