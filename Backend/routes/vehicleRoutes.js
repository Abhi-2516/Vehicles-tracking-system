const express = require("express");
const Vehicle = require("../models/vehicle");
const Location = require("../models/location");

const router = express.Router();

/**
 * Helper function to validate latitude and longitude
 */
const isValidCoordinates = (lat, lng) => {
  return (
    !isNaN(lat) && !isNaN(lng) &&
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
};

// ✅ Register a New Vehicle with Location
router.post("/", async (req, res) => {
  const { owner, licenseNumber, type, model, latitude, longitude } = req.body;

  // ✅ Validate lat/lng
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: "Invalid latitude or longitude" });
  }

  try {
    const vehicle = new Vehicle({
      owner,
      licenseNumber,
      type,
      model,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    await vehicle.save();
    res.status(201).json({ message: "Vehicle registered successfully", vehicle });
  } catch (error) {
    console.error("Error registering vehicle:", error);
    res.status(500).json({ message: "Error registering vehicle" });
  }
});

// ✅ Get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "name email");

    // Ensure latitude & longitude are numbers to prevent Google Maps errors
    const formattedVehicles = vehicles.map((vehicle) => ({
      ...vehicle._doc,
      latitude: parseFloat(vehicle.latitude),
      longitude: parseFloat(vehicle.longitude),
    }));

    res.json(formattedVehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error: error.message });
  }
});

// ✅ Get a specific vehicle
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicle", error: error.message });
  }
});

// ✅ Update a vehicle
router.put("/:id", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Validate lat/lng before updating
    if (latitude !== undefined && longitude !== undefined) {
      if (!isValidCoordinates(latitude, longitude)) {
        return res.status(400).json({ message: "Invalid latitude or longitude" });
      }
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Error updating vehicle" });
  }
});

// ✅ Delete a vehicle
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    await Location.deleteMany({ vehicle: req.params.id }); // Delete related locations
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle", error: error.message });
  }
});

module.exports = router;
