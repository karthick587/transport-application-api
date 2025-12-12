const { AppDataSource } = require("../database/databaseProvider");

async function getTransporters() {
    try {
        const transporterRepo = AppDataSource.getRepository("transporter");

        const transporters = await transporterRepo
            .createQueryBuilder("transporter")
            .select([
                "transporter.id",
                "transporter.name",
                "transporter.phone",
                "transporter.gstNo",
                "transporter.address"
            ])
            .andWhere("transporter.isDeleted = :isDeleted", { isDeleted: 0 }) // or false
            .getMany();

        return transporters;

    } catch (err) {
        console.error("Error fetching transporters:", err);
        throw new Error("Failed to load transporter list");
    }
}

async function getTransporter(id) {
    try {
        const transporterRepo = AppDataSource.getRepository("transporter");

        const transporter = await transporterRepo
            .createQueryBuilder("transporter")
            .select([
                "transporter.id",
                "transporter.name",
                "transporter.phone",
                "transporter.gstNo",
                "transporter.address"
            ])
            .where("transporter.id = :id", { id: id })
            .andWhere("transporter.isDeleted = :isDeleted", { isDeleted: 0 }) // or false
            .getOne();

        return transporter;

    } catch (err) {
        console.error("Error fetching transporter:", err);
        throw new Error("Failed to load transporter list");
    }
}

async function addTransporter(transporter) {
    try {
        const transporterRepo = AppDataSource.getRepository("transporter");
        const newTransporter = transporterRepo.create(transporter);
        return await transporterRepo.save(newTransporter);
    } catch (err) {
        console.error("Error adding transporter:", err);
        throw new Error("Failed to add transporter");
    }
}

async function updateTransporter(transporter) {
    try {
        const transporterRepo = AppDataSource.getRepository("transporter");

        // Check if ID exists (recommended to avoid accidental insert)
        const existing = await transporterRepo.findOne({
            where: { id: transporter.id }
        });

        if (!existing) {
            throw new Error(`Transporter with ID ${transporter.id} not found`);
        }

        // Merge new data into existing record
        const updated = transporterRepo.merge(existing, transporter);

        // Save updated record
        return await transporterRepo.save(updated);

    } catch (err) {
        console.error("Error updating transporter:", err);
        throw new Error("Failed to update transporter");
    }

}

async function softDeleteTransporter(id) {
    try {
        const transporterRepo = AppDataSource.getRepository("transporter");

        // Check if ID exists (recommended to avoid accidental insert)
        const existing = await transporterRepo.findOne({
            where: { id: id }
        });

        if (!existing) {
            throw new Error(`Transporter with ID ${id} not found`);
        }

        const transporter = {
            id: id,
            isDeleted: true
        }

        // Merge new data into existing record
        const updated = transporterRepo.merge(existing, transporter);

        // Save updated record
        return await transporterRepo.save(updated);

    } catch (err) {
        console.error("Error deleting transporter:", err);
        throw new Error("Failed to delete transporter");
    }
}



module.exports = {
    getTransporters,
    getTransporter,
    addTransporter,
    updateTransporter,
    softDeleteTransporter
};

