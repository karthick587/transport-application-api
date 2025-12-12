const { AppDataSource } = require("../database/databaseProvider");

async function getShipments() {
    try {
        const shipmentRepo = AppDataSource.getRepository("shipment");

        const shipments = await shipmentRepo
            .createQueryBuilder("shipment")
            .leftJoinAndSelect("shipment.vehicle", "vehicle")
            .leftJoinAndSelect("shipment.transporter", "transporter")
            .leftJoinAndSelect("shipment.destination", "destination")
            .select([
                "shipment.id",
                "shipment.shipmentNumber",
                "shipment.vehicleId",
                "shipment.transporterId",
                "shipment.destinationId",
                "shipment.pickupDate",
                "shipment.pickup_completed_at",
                "shipment.expected_delivery_date",
                "shipment.delivered_at",
                "shipment.status",
                "vehicle.id",
                "vehicle.name",
                "vehicle.vehicleNumber",
                "transporter.id",
                "transporter.name",
                "transporter.phone",
                "destination.id",
                "destination.name",
                "destination.code"
            ])
            .where("shipment.isDeleted = :isDeleted", { isDeleted: 0 })
            .getMany();

        return shipments;

    } catch (err) {
        console.error("Error fetching shipments:", err);
        throw new Error("Failed to load shipments list");
    }
}

async function getShipment(id) {
    try {
        const shipmentRepo = AppDataSource.getRepository("shipment");
        const shipment = await shipmentRepo
            .createQueryBuilder("shipment")
            .leftJoinAndSelect("shipment.vehicle", "vehicle")
            .leftJoinAndSelect("shipment.transporter", "transporter")
            .leftJoinAndSelect("shipment.destination", "destination")
            .select([
                "shipment.id",
                "shipment.shipmentNumber",
                "shipment.vehicleId",
                "shipment.transporterId",
                "shipment.destinationId",
                "shipment.pickupDate",
                "shipment.pickup_completed_at",
                "shipment.expected_delivery_date",
                "shipment.delivered_at",
                "shipment.status",
                "vehicle.id",
                "vehicle.name",
                "vehicle.vehicleNumber",
                "transporter.id",
                "transporter.name",
                "transporter.phone",
                "destination.id",
                "destination.name",
                "destination.code"
            ])
            .where("shipment.id = :id", { id: id })
            .andWhere("shipment.isDeleted = :isDeleted", { isDeleted: 0 })
            .getOne();
        return shipment;
    } catch (err) {
        console.error("Error fetching shipment:", err);
        throw new Error("Failed to load shipment");
    }
}

async function getNextShipmentNumber() {
    try {
        const shipmentRepo = AppDataSource.getRepository("shipment");
        
        // Get all shipments and find the maximum shipment number
        const allShipments = await shipmentRepo
            .createQueryBuilder("shipment")
            .select("shipment.shipmentNumber", "number")
            .getRawMany();
        
        let maxNumber = 0;
        if (allShipments.length > 0) {
            // Parse all shipment numbers and find the maximum
            const numbers = allShipments
                .map(s => {
                    const num = parseInt(s.number);
                    return isNaN(num) ? 0 : num;
                })
                .filter(n => n > 0);
            
            if (numbers.length > 0) {
                maxNumber = Math.max(...numbers);
            }
        }
        
        // Return next number as string
        return (maxNumber + 1).toString();
    } catch (err) {
        console.error("Error getting next shipment number:", err);
        // Fallback: count all shipments and add 1
        try {
            const shipmentRepo = AppDataSource.getRepository("shipment");
            const count = await shipmentRepo.count();
            return (count + 1).toString();
        } catch (countErr) {
            return "1";
        }
    }
}

async function addShipment(shipment) {
    try {
        const shipmentRepo = AppDataSource.getRepository("shipment");
        
        // Auto-generate shipment number if not provided
        if (!shipment.shipmentNumber) {
            shipment.shipmentNumber = await getNextShipmentNumber();
        }
        
        const newShipment = shipmentRepo.create(shipment);
        return await shipmentRepo.save(newShipment);
    } catch (err) {
        console.error("Error adding shipment:", err);
        throw new Error("Failed to add shipment");
    }
}

async function updateShipment(shipment) {
    try {
        const shipmentRepo = AppDataSource.getRepository("shipment");
        const existing = await shipmentRepo.findOne({
            where: { id: shipment.id }
        });
        if (!existing) {
            throw new Error(`Shipment with ID ${shipment.id} not found`);
        }
        const updated = shipmentRepo.merge(existing, shipment);
        return await shipmentRepo.save(updated);
    } catch (err) {
        console.error("Error updating shipment:", err);
        throw new Error("Failed to update shipment");
    }
}

async function softDeleteShipment(id) {
    try {
        const shipmentRepo = AppDataSource.getRepository("shipment");
        const existing = await shipmentRepo.findOne({
            where: { id: id }
        });
        if (!existing) {
            throw new Error(`Shipment with ID ${id} not found`);
        }
        const shipment = {
            id: id,
            isDeleted: true
        }
        const updated = shipmentRepo.merge(existing, shipment);
        return await shipmentRepo.save(updated);
    } catch (err) {
        console.error("Error deleting shipment:", err);
        throw new Error("Failed to delete shipment");
    }
}

module.exports = {
    getShipments,
    getShipment,
    addShipment,
    updateShipment,
    softDeleteShipment
};

