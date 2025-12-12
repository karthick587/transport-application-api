const { AppDataSource } = require("../database/databaseProvider");

async function getShipmentItems(shipmentId) {
    try {
        const shipmentItemRepo = AppDataSource.getRepository("shipmentItem");

        const items = await shipmentItemRepo
            .createQueryBuilder("shipmentItem")
            .select([
                "shipmentItem.id",
                "shipmentItem.shipmentId",
                "shipmentItem.itemId",
                "shipmentItem.quantity",
                "shipmentItem.totalVolume",
                "item.name",
                "item.code",
                "item.category",
                "item.description",
                "item.weight",
                "item.volume"
            ])
            .leftJoin("shipmentItem.item", "item")
            .where("shipmentItem.shipmentId = :shipmentId", { shipmentId: shipmentId })
            .andWhere("shipmentItem.isDeleted = :isDeleted", { isDeleted: 0 }) // or false
            .getMany();
        return items;
    } catch (err) {
        console.error("Error fetching shipment Item:", err);
        throw new Error("Failed to load shipment Item list");
    }
}


async function addShipmentItem(shipmentItem) {
    try {
        const shipmentItemRepo = AppDataSource.getRepository("shipmentItem");
        const newShipmentItem = shipmentItemRepo.create(shipmentItem);
        return await shipmentItemRepo.save(newShipmentItem);
    } catch (err) {
        console.error("Error adding shipment Item:", err);
        throw new Error(err.message||"Failed to add shipment Item");
    }
}

async function updateShipmentItem(shipmentItem) {
    try {
        const shipmentItemRepo = AppDataSource.getRepository("shipmentItem");

        // Check if ID exists (recommended to avoid accidental insert)
        const existing = await shipmentItemRepo.findOne({
            where: { id: shipmentItem.id }
        });

        if (!existing) {
            throw new Error(`Shipment Item with ID ${shipmentItem.id} not found`);
        }

        // Merge new data into existing record
        const updated = shipmentItemRepo.merge(existing, shipmentItem);

        // Save updated record
        return await shipmentItemRepo.save(updated);
    } catch (err) {
        console.error("Error updating shipment Item:", err);
        throw new Error(err.message|| "Failed to update shipment Item");
    }

}


async function deleteShipmentItem(id) {
    try {
        const shipmentItemRepo = AppDataSource.getRepository("shipmentItem");

        // Check if ID exists (recommended to avoid accidental insert)
        const existing = await shipmentItemRepo.findOne({
            where: { id: id }
        });

        if (!existing) {
            throw new Error(`Shipment Item with ID ${id} not found`);
        }

        const shipmentItem = {
            id: id,
            isDeleted: true
        }

        // Merge new data into existing record
        const updated = shipmentItemRepo.merge(existing, shipmentItem);

        // Save updated record
        return await shipmentItemRepo.save(updated);

    } catch (err) {
        console.error("Error deleting shipment Item:", err);
        throw new Error(err.message||"Failed to delete shipment Item");
    }
}


module.exports = {
    getShipmentItems,
    updateShipmentItem,
    addShipmentItem,
    deleteShipmentItem
};

