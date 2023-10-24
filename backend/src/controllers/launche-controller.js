"use strict";

const dao = require("../dao/launche-dao");

exports.get = async (req, res, next) => {
  try {
    let { search, page = 1, limit } = req.query;

    let { result, totalDocs, totalPages } = await dao.get(search, page, limit);
    res.status(200).send({
      result,
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });
  } catch (e) {
    console.log(`${new Date()} - (error) ${e}`);
    res.status(500).send({
      message: "Falha ao processar a requisição!",
      error: e.message,
    });
  }
};
