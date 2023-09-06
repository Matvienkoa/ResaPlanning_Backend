const express = require('express');
const router = express.Router();
const requestsCtrl = require('../controllers/requests');

router.get('/', requestsCtrl.getAllRequestsToAdmin);

module.exports = router;