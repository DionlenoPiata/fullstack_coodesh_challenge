"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/launche-controller");

router.get("/", controller.get);

module.exports = router;
