const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Shipment",
    tableName: "shipment",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        shipmentNumber: { type: "varchar", nullable: false },
        vehicleId: { type: "int", nullable: false },
        transporterId: { type: "int", nullable: false },
        destinationId: { type: "int", nullable: false },
        pickupDate: { type: "timestamp", nullable: true },
        pickup_completed_at: { type: "timestamp", nullable: true },
        expected_delivery_date: { type: "timestamp", nullable: true },
        delivered_at: { type: "timestamp", nullable: true },
        status: { type: "varchar", nullable: true },
        isDeleted: { type: "boolean", default: false },
        userId: { type: "int", nullable: false },
        createdAt: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" },
        updatedAt: { type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }
    },

    relations: {
        vehicle: {
            target: "Vehicle",             
            type: "many-to-one",
            joinColumn: {
                name: "vehicleId"
            }
        },

        transporter: {
            target: "Transporter",          
            type: "many-to-one",
            joinColumn: {
                name: "transporterId"
            }
        },

        destination: {
            target: "Lookup",            
            type: "many-to-one",
            joinColumn: {
                name: "destinationId"
            }
        }
    }
});
