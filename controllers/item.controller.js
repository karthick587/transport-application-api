const { getItems, getItem, addItem, updateItem, softDeleteItem } = require("../lib/item");

const getAllItems = async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).send({
            statusCode: 200,
            data: items
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("id is required");
        const item = await getItem(id);
        res.status(200).send({
            statusCode: 200,
            data: item
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createItem = async (req, res) => {
    try {
        const item = req.body || {};
        const newItem = await addItem(item);
        if (!newItem) {
            throw new Error("Failed to add item");
        }
        res.status(200).send({
            statusCode: 200,
            data: newItem
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const editItem = async (req, res) => {
    try {
        const item = req.body || {};
        if (!item.id) throw new Error("id is required");
        const updatedItem = await updateItem(item);
        if (!updatedItem) {
            throw new Error("Failed to update item");
        }
        res.status(200).send({
            statusCode: 200,
            data: updatedItem
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("id is required");
        const deletedItem = await softDeleteItem(id);
        if (!deletedItem) {
            throw new Error("Failed to delete item");
        }
        res.status(200).send({
            statusCode: 200,
            data: deletedItem
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    editItem,
    deleteItem
}
