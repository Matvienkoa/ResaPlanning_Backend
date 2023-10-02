const express = require('express');
const router = express.Router();
const requestsCtrl = require('../controllers/requests');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.get('/', checkJWT, checkUser, checkAdmin, requestsCtrl.getAllRequestsToAdmin);

module.exports = router;