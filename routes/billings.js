const express = require('express');
const router = express.Router();
const billingsCtrl = require('../controllers/billings');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.get('/billed/:date', checkJWT, checkUser, checkAdmin, billingsCtrl.getAllPreparationsCompletedBilled);
router.get('/nobilled', checkJWT, checkUser, checkAdmin, billingsCtrl.getAllPreparationsCompletedNoBilled);

module.exports = router;