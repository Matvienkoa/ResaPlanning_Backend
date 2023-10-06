const express = require('express');
const router = express.Router();
const requestsCtrl = require('../controllers/requests');
const { checkJWT, checkUser } = require('../middleware/auth');

router.get('/', checkJWT, checkUser, requestsCtrl.getAllRequestsToAdmin);

module.exports = router;