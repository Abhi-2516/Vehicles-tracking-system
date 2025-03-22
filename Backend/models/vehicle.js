const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  latitude: { type: Number, required: true }, 
  longitude: { type: Number, required: true }, 
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
