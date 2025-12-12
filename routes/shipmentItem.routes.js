// src/routes/shipmentItem.routes.js
const express = require("express");
const router = express.Router();

const {
    getShipmentItemsByShipmentId,
    createShipmentItem,
    editShipmentItem,
    deleteShipmentItemById
} = require("../controllers/shipmentItem.controller");

// GET all items for a shipment
router.get("/shipment/:shipmentId", getShipmentItemsByShipmentId);

// POST a new shipment item
router.post("/", createShipmentItem);

// PUT update a shipment item
router.put("/:id", editShipmentItem);

// DELETE a shipment item
router.delete("/:id", deleteShipmentItemById);

module.exports = router;

