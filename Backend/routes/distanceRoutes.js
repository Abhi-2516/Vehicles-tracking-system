const express = require("express");
const axios = require("axios");
const Vehicle = require("../models/vehicle"); // ✅ Ensure Vehicle Model is imported
require("dotenv").config();

const router = express.Router();

// ✅ Ensure Correct API Route to Calculate Distance
router.get("/:vehicle1Id/:vehicle2Id", async (req, res) => {
  try {
    const { vehicle1Id, vehicle2Id } = req.params;

    console.log("🚀 Received vehicle IDs:", vehicle1Id, vehicle2Id); // Debugging log

    // ✅ Fetch Vehicle Locations
    const vehicle1 = await Vehicle.findById(vehicle1Id);
    const vehicle2 = await Vehicle.findById(vehicle2Id);

    if (!vehicle1 || !vehicle2) {
      return res.status(404).json({ message: "One or both vehicles not found" });
    }

    console.log("📍 Vehicle 1 Location:", vehicle1.latitude, vehicle1.longitude);
    console.log("📍 Vehicle 2 Location:", vehicle2.latitude, vehicle2.longitude);

    // ✅ Construct Google Maps Distance API URL
    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${vehicle1.latitude},${vehicle1.longitude}&destinations=${vehicle2.latitude},${vehicle2.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

    console.log("🌍 Calling Google API:", url); // Debugging log

    // ✅ Call Google Maps API
    const response = await axios.get(url);
    const data = response.data;

    console.log("✅ Google API Response:", data);

    if (data.status !== "OK") {
      return res.status(500).json({ message: "Error fetching distance data", error: data });
    }

    // ✅ Extract Distance & Duration
    const distanceText = data.rows[0].elements[0].distance.text;
    const durationText = data.rows[0].elements[0].duration.text;

    res.json({
      vehicle1: vehicle1.model,
      vehicle2: vehicle2.model,
      distance: distanceText,
      estimatedTime: durationText,
    });
  } catch (error) {
    console.error("❌ Error calculating distance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
