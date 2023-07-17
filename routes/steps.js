const express = require('express');
const router = express.Router();
const stepCtrl = require('../controllers/steps');

router.post('/', stepCtrl.createStep);

module.exports = router;