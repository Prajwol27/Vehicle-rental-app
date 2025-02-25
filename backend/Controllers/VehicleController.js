const Vehicle = require('../Models/Vehicle.js');

//toget all the vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};

//to create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { type, model, pricePerDay, available } = req.body;
    const image = req.file ? req.file.filename : '';

    const vehicle = new Vehicle({ type, model, pricePerDay, available, image });
    await vehicle.save();
    
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Error adding vehicle", error });
  }
};

//to update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: "Error updating vehicle", error });
  }
};

//to delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle", error });
  }
};
