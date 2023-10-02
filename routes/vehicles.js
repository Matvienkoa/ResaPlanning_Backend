const express = require('express');
const router = express.Router();
const vehicleCtrl = require('../controllers/vehicles');
const multerImages = require('../middleware/multerImages');
const multerImage = require('../middleware/multerImage');
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');

router.post('/', checkJWT, checkUser, checkAdmin, multerImages, vehicleCtrl.createVehicle);
router.put('/:id', checkJWT, checkUser, checkAdmin, vehicleCtrl.editVehicleInfos);
router.put('/photo/:id', checkJWT, checkUser, checkAdmin, multerImage, vehicleCtrl.editVehiclePhoto);
router.put('/photo/delete/:id', checkJWT, checkUser, checkAdmin, multerImage, vehicleCtrl.deleteVehiclePhoto);
router.delete('/:id', checkJWT, checkUser, checkAdmin, vehicleCtrl.deleteVehicle);
router.get('/', checkJWT, checkUser, vehicleCtrl.getAllVehicles);
router.get('/:id', checkJWT, checkUser, vehicleCtrl.getOneVehicle);

module.exports = router;