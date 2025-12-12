// src/index.js
require("reflect-metadata");
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./database/databaseProvider");
const transporterRoutes = require("./routes/transporter.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const itemRoutes = require("./routes/item.routes");
const shipmentRoutes = require("./routes/shipment.routes");
const shipmentItemRoutes = require("./routes/shipmentItem.routes");
const lookupRoutes = require("./routes/lookup.routes");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
    .then(() => {
        console.log("MySQL + TypeORM connected!");

    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });


app.use("/transporters", transporterRoutes);
app.use("/items", itemRoutes);
app.use("/shipments", shipmentRoutes);
app.use("/shipmentItems", shipmentItemRoutes);
app.use("/lookup", lookupRoutes);
app.use("/vehicles", vehicleRoutes);


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
