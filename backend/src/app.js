"use strict";

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// conect database
async function connectDatabase() {
  await mongoose.connect(process.env.CONECTION_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
connectDatabase();

// loading models
const Launche = require("./models/launche");
const Rocket = require("./models/rocket");

// routers
const indexRoute = require("./routes/index-route");
const launcheRoute = require("./routes/launche-route");

// data conversion middleware
app.use(express.json({ limit: "5mb" }));

// settings CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// application routes
app.use("/", indexRoute);
app.use("/launches", launcheRoute);

module.exports = app;
