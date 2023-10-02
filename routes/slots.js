const express = require('express');
const router = express.Router();
const slotCtrl = require('../controllers/slots');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, checkAdmin, slotCtrl.createSlot);
router.put('/:id', checkJWT, checkUser, slotCtrl.editSlot);
router.put('/drop/:id', checkJWT, checkUser, checkAdmin, slotCtrl.dropSlot);
router.put('/size/:id', checkJWT, checkUser, checkAdmin, slotCtrl.sizeSlot);
router.delete('/:id', checkJWT, checkUser, checkAdmin, slotCtrl.deleteSlot);
router.get('/start/:start/end/:end', checkJWT, checkUser, checkAdmin, slotCtrl.getAllSlots);
router.get('/:id', checkJWT, checkUser, slotCtrl.getOneSlot);

module.exports = router;