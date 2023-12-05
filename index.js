const express = require("express");
const router = require("./src/api/router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use("/api", router);

const PORT = process.env.PORT ?? 5050;
const DB_URL = process.env.DB_URL ?? "mongodb://127.0.0.1:27017/mp";

mongoose
  .connect(DB_URL)
  .then(() => app.listen(PORT))
  .then(() => console.log(`Listening on port ${PORT}`))
  .catch((error) => console.error(error));

module.exports = app;
