// src/entity/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ShipmentItem",
    tableName: "shipmentItem",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        shipmentId: {
            type: "int",
            nullable: false
        },
        itemId: {
            type: "int",
            nullable: false
        },
        quantity: {
            type: "int",
            nullable: false
        },
        totalVolume: {
            type: "int"
        },
        isDeleted: {
            type: 'boolean',
            default: false
        },
        userId: {
            type: "int",
            nullable: false
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP"
        }

    },
    relations: {
        shipment: {
            target: "Shipment",
            type: "many-to-one",
            joinColumn: {
                name: "shipmentId",
                referencedColumnName: "id"
            },
        },
        item: {
            target: "Item",
            type: "many-to-one",
            joinColumn: {
                name: "itemId",
                referencedColumnName: "id"
            },
        }
    }
});
