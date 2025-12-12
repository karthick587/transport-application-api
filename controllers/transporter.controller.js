const { getTransporters, addTransporter, softDeleteTransporter, updateTransporter } = require("../lib/transporter");


const getAllTransporter = async (req, res) => {
    try {
        const transporters = await getTransporters()
        res.status(200).send({
            statusCode: 200,
            data: transporters
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const createTransporter = async (req, res) => {
    try {
        const transporter = req.body || {};
        const newTransporter = await addTransporter(transporter);
        if (!newTransporter) {
            throw new Error("Failed to add transporter");
        }
        res.status(200).send({
            statusCode: 200,
            data: newTransporter
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const editTransporter = async (req, res) => {
    try {
        const transporter = req.body || {};
        if (!transporter.id) throw new Error("id is required")
        const updatedTransporter = await updateTransporter(transporter);
        if (!updatedTransporter) {
            throw new Error("Failed to update transporter");
        }
        res.status(200).send({
            statusCode: 200,
            data: updatedTransporter
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteTransporter = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) throw new Error("id is required")
        const deletedTransporter = await softDeleteTransporter(id);
        if (!deletedTransporter) {
            throw new Error("Failed to delete transporter");
        }
        res.status(200).send({
            statusCode: 200,
            data: deletedTransporter
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {
    getAllTransporter,
    createTransporter,
    editTransporter,
    deleteTransporter
};
