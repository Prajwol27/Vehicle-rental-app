const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  pickupLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  returnLocation: { type: String, required: true },
  returnDate: { type: Date, required: true },
  returnTime: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);