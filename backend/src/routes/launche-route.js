"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/launche-controller");

router.get("/launches", controller.get);
router.get("/launches/stats/chart/pie", controller.getStatsForPieChart);
router.get("/launches/stats/chart/bar", controller.getStatsForBarChart);

module.exports = router;
