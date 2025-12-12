const { AppDataSource } = require("../database/databaseProvider");

async function getVehicles() {
    try {
        const vehicleRepo = AppDataSource.getRepository("vehicle");

        const vehicles = await vehicleRepo
            .createQueryBuilder("vehicle")
            .select([
                "vehicle.id",
                "vehicle.name",
                "vehicle.vehicleNumber",
                "vehicle.weight",
                "vehicle.volume"
            ])
            .where("vehicle.isDeleted = :isDeleted", { isDeleted: 0 })
            .getMany();

        return vehicles;

    } catch (err) {
        console.error("Error fetching vehicles:", err);
        throw new Error("Failed to load vehicles list");
    }
}


async function addVehicle(vehicle) {
    try {
        const vehicleRepo = AppDataSource.getRepository("vehicle");
        const newVehicle = vehicleRepo.create(vehicle);
        return await vehicleRepo.save(newVehicle);
    } catch (err) {
        console.error("Error adding vehicle:", err);
        throw new Error("Failed to add vehicle");
    }
}

async function updateVehicle(vehicle) {
    try {
        const vehicleRepo = AppDataSource.getRepository("vehicle");

        // Check if ID exists (recommended to avoid accidental insert)
        const existing = await vehicleRepo.findOne({
            where: { id: vehicle.id }
        });

        if (!existing) {
            throw new Error(`Vehicle with ID ${vehicle.id} not found`);
        }

        // Merge new data into existing record
        const updated = vehicleRepo.merge(existing, vehicle);

        // Save updated record
        return await vehicleRepo.save(updated);

    } catch (err) {
        console.error("Error updating vehicle:", err);
        throw new Error("Failed to update vehicle");
    }
}

async function softDeleteVehicle(id) {
    try {
        const vehicleRepo = AppDataSource.getRepository("vehicle");

        // Check if ID exists (recommended to avoid accidental insert)
        const existing = await vehicleRepo.findOne({
            where: { id: id }
        });

        if (!existing) {
            throw new Error(`Vehicle with ID ${id} not found`);
        }

        const vehicle = {
            id: id,
            isDeleted: true
        }

        // Merge new data into existing record
        const updated = vehicleRepo.merge(existing, vehicle);

        // Save updated record
        return await vehicleRepo.save(updated);

    } catch (err) {
        console.error("Error deleting vehicle:", err);
        throw new Error("Failed to delete vehicle");
    }
}

module.exports = {
    getVehicles,
    addVehicle,
    updateVehicle,
    softDeleteVehicle
};


