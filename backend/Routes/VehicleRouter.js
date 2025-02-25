const express = require('express');
const multer = require('multer');
const vehicleController = require('../Controllers/VehicleController');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage: storage });



router.get('/', vehicleController.getAllVehicles);
router.post('/', upload.single('image'), vehicleController.createVehicle);
router.put('/:id', upload.single('image'), vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
