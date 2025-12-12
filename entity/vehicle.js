// src/entity/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Vehicle",
    tableName: "vehicle",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            nullable: false
        },
        vehicleNumber: {
            type: "varchar"
        },
        weight: {
            type: "int"
        },
        volume: {
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
    }
});
