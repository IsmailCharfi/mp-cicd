const express = require("express");
const router = require("./src/api/router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const prometheusMiddleware = require('express-prometheus-middleware');

dotenv.config();

const app = express();

app.use(express.json());
app.use(prometheusMiddleware({ metricsPath: '/metrics' }));
app.use(express.static(path.join(__dirname, "src", "app", "dist")));
app.use("/api", router);

const PORT = process.env.TEST_MODE ? 5051 : process.env.PORT ?? 5050;
const DB_URL = process.env.DB_URL ?? "mongodb://127.0.0.1:27017/mp";

mongoose.connect(DB_URL).catch((error) => console.error(error));

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {
  app,
  server,
};
