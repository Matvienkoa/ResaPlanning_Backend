const express = require('express');
const router = express.Router();
const slotCtrl = require('../controllers/slots');
const { checkJWT, checkUser } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, slotCtrl.createSlot);
router.put('/:id', checkJWT, checkUser, slotCtrl.editSlot);
router.put('/drop/:id', checkJWT, checkUser, slotCtrl.dropSlot);
router.put('/size/:id', checkJWT, checkUser, slotCtrl.sizeSlot);
router.delete('/:id', checkJWT, checkUser, slotCtrl.deleteSlot);
router.get('/start/:start/end/:end', checkJWT, checkUser, slotCtrl.getAllSlots);
router.get('/:id', checkJWT, checkUser, slotCtrl.getOneSlot);
router.get('/customer/:customerId', checkJWT, checkUser, slotCtrl.getAllSlotsCustomer);

module.exports = router;