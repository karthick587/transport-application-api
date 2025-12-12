// src/entity/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Item",
    tableName: "item",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        code: {
            type: "varchar"
        },
        category: {
            type: "varchar"
        },
        description: {
            type: "varchar",
        },
        weight: {
            type: "int",
        },
        width: {
            type: "int",
        },
        height: {
            type: "int",
        },
        length: {
            type: "int",
        },
        volume: {
            type: "int",
        },
        qr_code: {
            type: "varchar",
        },
        barcode: {
            type: "varchar",
        },
        isActive: {
            type: 'boolean',
            default: false
        },
        maxQuantity: {
            type: 'int'
        },
        minQuantity: {
            type: 'int'
        },
        isDeleted: {
            type: 'boolean',
            default: false
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
    }
});
