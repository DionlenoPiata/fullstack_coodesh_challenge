"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    message: process.env.APP_NAME,
  });
});

module.exports = router;
