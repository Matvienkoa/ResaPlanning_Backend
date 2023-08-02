const express = require('express');
const router = express.Router();
const slotCtrl = require('../controllers/slots');

router.post('/', slotCtrl.createSlot);
router.get('/', slotCtrl.getAllSlots);

module.exports = router;