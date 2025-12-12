// src/entity/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Transporter",
    tableName: "transporter",
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
        phone: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        gstNo: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        address: {
            type: "varchar",
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
