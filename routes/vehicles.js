const express = require('express');
const router = express.Router();
const vehicleCtrl = require('../controllers/vehicles');
const multerImages = require('../middleware/multerImages');
const multerImage = require('../middleware/multerImage');

router.post('/', multerImages, vehicleCtrl.createVehicle);
router.put('/:id', vehicleCtrl.editVehicleInfos);
router.put('/photo/:id', multerImage, vehicleCtrl.editVehiclePhoto);
router.get('/', vehicleCtrl.getAllVehicles);
router.get('/:id', vehicleCtrl.getOneVehicle);

module.exports = router;