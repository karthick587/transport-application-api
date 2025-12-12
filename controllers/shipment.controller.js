const { getShipments, getShipment, addShipment, updateShipment, softDeleteShipment } = require("../lib/shipment");
const { addShipmentItem } = require("../lib/shipmentItem");

const getAllShipment = async (req, res) => {
    try {
        const shipments = await getShipments();
        res.status(200).send({
            statusCode: 200,
            data: shipments
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getShipmentById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("id is required");
        const shipment = await getShipment(id);
        res.status(200).send({
            statusCode: 200,
            data: shipment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createShipment = async (req, res) => {
    try {
        const { items, ...shipmentData } = req.body || {};
        
        // Remove shipmentNumber from request - it will be auto-generated
        delete shipmentData.shipmentNumber;

        const newShipment = await addShipment(shipmentData);
        if (!newShipment) {
            throw new Error("Failed to add shipment");
        }

        // Add shipment items if provided
        if (items && Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                await addShipmentItem({
                    shipmentId: newShipment.id,
                    itemId: item.itemId,
                    quantity: item.quantity,
                    totalVolume: item.totalVolume || 0,
                    userId: shipmentData.userId || 1
                });
            }
        }

        res.status(200).send({
            statusCode: 200,
            data: newShipment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const editShipment = async (req, res) => {
    try {
        const shipment = req.body || {};
        if (!shipment.id) throw new Error("id is required");
        const updatedShipment = await updateShipment(shipment);
        if (!updatedShipment) {
            throw new Error("Failed to update shipment");
        }
        res.status(200).send({
            statusCode: 200,
            data: updatedShipment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteShipment = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("id is required");
        const deletedShipment = await softDeleteShipment(id);
        if (!deletedShipment) {
            throw new Error("Failed to delete shipment");
        }
        res.status(200).send({
            statusCode: 200,
            data: deletedShipment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllShipment,
    getShipmentById,
    createShipment,
    editShipment,
    deleteShipment
}