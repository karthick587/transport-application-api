// src/routes/transporter.routes.js
const express = require("express");
const router = express.Router();

const {
    getAllTransporter,
    createTransporter,
    editTransporter,
    deleteTransporter

} = require("../controllers/transporter.controller");

// GET all transporters
router.get("/", getAllTransporter);

// POST a new transporter
router.post("/", createTransporter);

// PUT update a transporter
router.put("/:id", editTransporter);

// DELETE a transporter
router.delete("/:id", deleteTransporter);


module.exports = router;
