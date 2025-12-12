const { getVehicles, addVehicle, updateVehicle, softDeleteVehicle } = require("../lib/vehicle");

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await getVehicles()
        res.status(200).send({
            statusCode: 200,
            data: vehicles
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createVehicle = async (req, res) => {
    try {
        const vehicle = req.body || {};
        const newVehicle = await addVehicle(vehicle);
        if (!newVehicle) {
            throw new Error("Failed to add vehicle");
        }
        res.status(200).send({
            statusCode: 200,
            data: newVehicle
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const editVehicle = async (req, res) => {
    try {
        const vehicle = req.body || {};
        if (!vehicle.id) throw new Error("id is required")
        const updatedVehicle = await updateVehicle(vehicle);
        if (!updatedVehicle) {
            throw new Error("Failed to update vehicle");
        }
        res.status(200).send({
            statusCode: 200,
            data: updatedVehicle
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) throw new Error("id is required")
        const deletedVehicle = await softDeleteVehicle(id);
        if (!deletedVehicle) {
            throw new Error("Failed to delete vehicle");
        }
        res.status(200).send({
            statusCode: 200,
            data: deletedVehicle
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllVehicles,
    editVehicle,
    createVehicle,
    deleteVehicle
}