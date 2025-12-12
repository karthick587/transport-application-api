// src/routes/vehicle.routes.js
const express = require("express");
const router = express.Router();

const {
    getAllVehicles,
    editVehicle,
    createVehicle,
    deleteVehicle
} = require("../controllers/vehicle.controller");

// GET all vehicles
router.get("/", getAllVehicles);

// POST a new vehicle
router.post("/", createVehicle);

// PUT update a vehicle
router.put("/:id", editVehicle);

// DELETE a vehicle
router.delete("/:id", deleteVehicle);




module.exports = router;
