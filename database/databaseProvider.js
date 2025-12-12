const { DataSource } = require("typeorm");
const path = require("path");
const item = require("../entity/item");
const transporter = require("../entity/transporter");
const shipment = require("../entity/shipment");
const lookup = require("../entity/lookup");
const shipmentItem = require("../entity/shipmentItem");
const vehicle = require("../entity/vehicle");

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "testdb",

    // synchronize: true,  // ✅ AUTO CREATE TABLES
    logging: false,

    // ✅ WORKS FOR BOTH JS AND TS
    entities: [
        item,
        transporter,
        shipment,
        lookup,
        shipmentItem,
        vehicle
    ],
});

module.exports = { AppDataSource };
