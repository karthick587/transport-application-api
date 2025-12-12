// src/routes/shipment.routes.js
const express = require("express");
const router = express.Router();

const {
    getAllShipment,
    getShipmentById,
    createShipment,
    editShipment,
    deleteShipment
} = require("../controllers/shipment.controller");

// GET all shipments
router.get("/", getAllShipment);

// GET shipment by id
router.get("/:id", getShipmentById);

// POST a new shipment
router.post("/", createShipment);

// PUT update a shipment
router.put("/:id", editShipment);

// DELETE a shipment
router.delete("/:id", deleteShipment);

module.exports = router;
