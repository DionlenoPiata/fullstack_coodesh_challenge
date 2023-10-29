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
  // #swagger.tags = ['Launche']
  // #swagger.description = 'Endpoint para obter os lançamentos de foguetes'
  try {
    let { search, page = 1, limit } = req.query;

    let { result, totalDocs, totalPages } = await launcheDao.get(
      search,
      page,
      limit
    );
    /*  #swagger.responses[200] = {
                description: "Retorna todos os lançamentos de foguetes com busca e paginação.",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/launcheResponse"
                        }
                    }           
                }
            }   
        */

    res.status(200).send({
      result,
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });
  } catch (error) {
    console.log(`${new Date()} - (error) ${error}`);
    res.status(400).send({
      message:
        "Não foi possível processar sua solicitação, tente novamente mais tarde!",
    });
  }
};

exports.getStatsForPieChart = async (req, res, next) => {
  // #swagger.tags = ['Launche']
  // #swagger.description = 'Endpoint para obter dados para gráfico de pizza.'
  let rockets = await rocketDao.getAll();

  Promise.all(
    rockets.map(async (rocket, index) => {
      let countLaunches = await launcheDao.countAllByQuery({
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
      let successfulLaunches = await launcheDao.countAllByQuery({
        success: true,
      });
      let failedLaunches = await launcheDao.countAllByQuery({
        success: false,
      });

      let result = {
        rockets: dataArray,
        successful_launches: successfulLaunches,
        failed_launches: failedLaunches,
      };
      /*  #swagger.responses[200] = {
                description: "Retorna os dados para o gráfico de pizza.",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/statsChartPieResponse"
                        }
                    }           
                }
            }   
        */
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(400).send({
        message:
          "Não foi possível processar sua solicitação, tente novamente mais tarde!",
      });
    });
};

exports.getStatsForBarChart = async (req, res, next) => {
  // #swagger.tags = ['Launche']
  // #swagger.description = 'Endpoint para obter dados para gráfico de barras.'
  try {
    let rockets = await rocketDao.getAll();
    let launchesGroupedByYear = await launcheDao.getAllGroupedByYear();

    let result = {
      rockets: rockets.map((rocker, index) => ({
        name: rocker.name,
        color: COLORS[index],
      })),
      data_per_year: launchesGroupedByYear.map((item) => {
        const year = item._id;
        const rocketsData = {};

        item.rockets.forEach((rocket) => {
          rocketsData[rocket.name] = rocket.count;
        });

        return {
          name: `${year}`,
          ...rocketsData,
        };
      }),
    };
    /*  #swagger.responses[200] = {
                description: "Retorna os dados para o gráfico de barra.",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/statsChartBarResponse"
                        }
                    }           
                }
            }   
        */
    res.status(200).send(result);
  } catch (error) {
    console.log(`${new Date()} - (error) ${error}`);
    res.status(400).send({
      message:
        "Não foi possível processar sua solicitação, tente novamente mais tarde!",
    });
  }
};
