const express = require('express');
const router = express.Router();
const billingsCtrl = require('../controllers/billings');

router.get('/', billingsCtrl.getAllPreparationsCompleted);

module.exports = router;