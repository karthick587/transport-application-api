// src/routes/item.routes.js
const express = require("express");
const router = express.Router();

const {
    getAllItems,
    getItemById,
    createItem,
    editItem,
    deleteItem
} = require("../controllers/item.controller");

// GET all items
router.get("/", getAllItems);

// GET item by id
router.get("/:id", getItemById);

// POST a new item
router.post("/", createItem);

// PUT update an item
router.put("/:id", editItem);

// DELETE an item
router.delete("/:id", deleteItem);

module.exports = router;
