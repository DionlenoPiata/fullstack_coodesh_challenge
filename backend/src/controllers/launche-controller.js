"use strict";

const launcheDao = require("../dao/launche-dao");
const rocketDao = require("../dao/rocket-dao");

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "	#836FFF",
  "#87CEEB",
  "	#708090",
];

exports.get = async (req, res, next) => {
  try {
    let { search, page = 1, limit } = req.query;

    let { result, totalDocs, totalPages } = await launcheDao.get(
      search,
      page,
      limit
    );
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

exports.getStatsForPieChart = async (req, res, next) => {
  let rockets = await rocketDao.getAll();

  Promise.all(
    rockets.map(async (rocket, index) => {
      let countLaunches = await launcheDao.countAllByIdQuery({
        rocket: rocket._id,
      });
      return {
        name: rocket.name,
        color: COLORS[index],
        count_launches: countLaunches,
      };
    })
  )
    .then(async (dataArray) => {
      let successfulLaunches = await launcheDao.countAllByIdQuery({
        success: true,
      });
      let failedLaunches = await launcheDao.countAllByIdQuery({
        success: false,
      });

      let result = {
        rockets: dataArray,
        successful_launches: successfulLaunches,
        failed_launches: failedLaunches,
      };

      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(404).send({});
    });
};

exports.getStatsForBarChart = async (req, res, next) => {
  let rockets = await rocketDao.getAll();

  let result = {
    rockets: rockets.map((rocker, index) => ({
      name: rocker.name,
      color: COLORS[index],
    })),
    data_per_year: [
      {
        name: "2015",
        "Foguete A": 1000,
        "Foguete B": 2000,
        "Foguete C": 3000,
        "Foguete D": 4000,
      },
      {
        name: "2016",
        "Foguete A": 1000,
        "Foguete B": 2000,
        "Foguete C": 3000,
        "Foguete D": 4000,
      },
    ],
  };

  res.send(result);
};
