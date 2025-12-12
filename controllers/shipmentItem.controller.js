const { getShipmentItems, addShipmentItem, updateShipmentItem, deleteShipmentItem } = require("../lib/shipmentItem");

const getShipmentItemsByShipmentId = async (req, res) => {
    try {
        const shipmentId = req.params.shipmentId;
        if (!shipmentId) throw new Error("shipmentId is required");
        const items = await getShipmentItems(shipmentId);
        res.status(200).send({
            statusCode: 200,
            data: items
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createShipmentItem = async (req, res) => {
    try {
        const shipmentItem = req.body || {};
        const newShipmentItem = await addShipmentItem(shipmentItem);
        if (!newShipmentItem) {
            throw new Error("Failed to add shipment item");
        }
        res.status(200).send({
            statusCode: 200,
            data: newShipmentItem
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const editShipmentItem = async (req, res) => {
    try {
        const shipmentItem = req.body || {};
        if (!shipmentItem.id) throw new Error("id is required");
        const updatedShipmentItem = await updateShipmentItem(shipmentItem);
        if (!updatedShipmentItem) {
            throw new Error("Failed to update shipment item");
        }
        res.status(200).send({
            statusCode: 200,
            data: updatedShipmentItem
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteShipmentItemById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("id is required");
        const deletedItem = await deleteShipmentItem(id);
        if (!deletedItem) {
            throw new Error("Failed to delete shipment item");
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
    getShipmentItemsByShipmentId,
    createShipmentItem,
    editShipmentItem,
    deleteShipmentItemById
}

