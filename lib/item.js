const { AppDataSource } = require("../database/databaseProvider");

async function getItems() {
    try {
        const itemRepo = AppDataSource.getRepository("item");

        const items = await itemRepo
            .createQueryBuilder("item")
            .select([
                "item.id",
                "item.name",
                "item.code",
                "item.category",
                "item.description",
                "item.weight",
                "item.volume"
            ])
            .where("item.isDeleted = :isDeleted", { isDeleted: 0 })
            .getMany();
        return items;
    } catch (err) {
        console.error("Error fetching items:", err);
        throw new Error("Failed to load items list");
    }
}

async function getItem(id) {
    try {
        const itemRepo = AppDataSource.getRepository("item");
        const item = await itemRepo
            .createQueryBuilder("item")
            .select([
                "item.id",
                "item.name",
                "item.code",
                "item.category",
                "item.description",
                "item.weight",
                "item.volume"
            ])
            .where("item.id = :id", { id: id })
            .andWhere("item.isDeleted = :isDeleted", { isDeleted: 0 })
            .getOne();
        return item;
    } catch (err) {
        console.error("Error fetching item:", err);
        throw new Error("Failed to load item");
    }
}

async function addItem(item) {
    try {
        const itemRepo = AppDataSource.getRepository("item");
        const newItem = itemRepo.create(item);
        return await itemRepo.save(newItem);
    } catch (err) {
        console.error("Error adding item:", err);
        throw new Error("Failed to add item");
    }
}

async function updateItem(item) {
    try {
        const itemRepo = AppDataSource.getRepository("item");
        const existing = await itemRepo.findOne({
            where: { id: item.id }
        });
        if (!existing) {
            throw new Error(`Item with ID ${item.id} not found`);
        }
        const updated = itemRepo.merge(existing, item);
        return await itemRepo.save(updated);
    } catch (err) {
        console.error("Error updating item:", err);
        throw new Error("Failed to update item");
    }
}

async function softDeleteItem(id) {
    try {
        const itemRepo = AppDataSource.getRepository("item");
        const existing = await itemRepo.findOne({
            where: { id: id }
        });
        if (!existing) {
            throw new Error(`Item with ID ${id} not found`);
        }
        const item = {
            id: id,
            isDeleted: true
        }
        const updated = itemRepo.merge(existing, item);
        return await itemRepo.save(updated);
    } catch (err) {
        console.error("Error deleting item:", err);
        throw new Error("Failed to delete item");
    }
}

module.exports = {
    getItems,
    getItem,
    addItem,
    updateItem,
    softDeleteItem
};

