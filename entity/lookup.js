// src/entity/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Lookup",
    tableName: "lookup",
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
        type: {
            type: "varchar"
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
