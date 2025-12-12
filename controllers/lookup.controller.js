const { getLookUp } = require("../lib/lookup");

const getAllLookUp = async (req, res) => {
    try {
        if (!req.params.type) throw new Error("type is required");
        const lookUp = await getLookUp(req.params.type);
        res.status(200).send({
            statusCode: 200,
            data: lookUp
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllLookUp
}