const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  type: { type: String, enum: ['bike', 'car'], required: true },
  model: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
  image: { type: String }, 
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
