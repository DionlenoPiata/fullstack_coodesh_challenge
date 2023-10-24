"use strict";

const dao = require("../dao/launche-dao");

exports.get = async (req, res, next) => {
  try {
    let data = await dao.get();
    res.status(200).send(data);
  } catch (e) {
    console.log(`${new Date()} - (error) ${e}`);
    res.status(500).send({
      message: "Falha ao processar a requisição!",
      error: e.message,
    });
  }
};
