const express = require("express");
const Location = require("../models/location");
const Vehicle = require("../models/vehicle");

const router = express.Router();

// Record Location Update
router.post("/", async (req, res) => {
    const { vehicle, latitude, longitude } = req.body;
    try {
      const location = new Location({ vehicle, latitude, longitude });
      await location.save();
      res.status(201).json({ message: "Location recorded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error recording location" });
    }
  });


// Get Location Updates for a Vehicle (Sorted by Latest First)
router.get("/:vehicleId", async (req, res) => {
  try {
    const locations = await Location.find({ vehicle: req.params.vehicleId })
      .sort({ timestamp: -1 })
      .populate("vehicle", "licenseNumber type model owner");

    if (locations.length === 0) {
      return res.status(404).json({ message: "No location updates found for this vehicle" });
    }

    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching location updates", error: error.message });
  }
});

// Get Latest Location of a Vehicle
router.get("/:vehicleId", async (req, res) => {
    try {
      const locations = await Location.find({ vehicle: req.params.vehicleId }).sort({ timestamp: -1 }).limit(1);
      res.json(locations[0]); // Return latest location
    } catch (error) {
      res.status(500).json({ message: "Error fetching location updates" });
    }
  });

module.exports = router;
