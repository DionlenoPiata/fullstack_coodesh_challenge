"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/launche-controller");

router.get("/", controller.get);
router.get("/stats/chart/pie", controller.getStatsForPieChart);
router.get("/stats/chart/bar", controller.getStatsForBarChart);

module.exports = router;
