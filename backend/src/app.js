"use strict";

const express = require("express");

const app = express();

// routers
const indexRoute = require("./routes/index-route");

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

module.exports = app;
