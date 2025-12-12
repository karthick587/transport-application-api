// src/routes/transporter.routes.js
const express = require("express");
const router = express.Router();

const {
    getAllLookUp
} = require("../controllers/lookup.controller");

// GET all lookups
router.get("/:type", getAllLookUp);


module.exports = router;
