"use strict";

const CronJob = require("cron").CronJob;
const axios = require("axios");
const launcheDao = require("../dao/launche-dao");

const job = new CronJob(
  //"*/5 * * * *", // five in five minutes
  "0 9 * * *", // at 9 o'clock
  update,
  null,
  true,
  "America/Sao_Paulo"
);

async function update() {
  try {
    console.log(`${new Date()} - Update database: Launches...`);
    console.log(`${new Date()} - Starting update launches data...`);

    const response = await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.spacexdata.com/v5/launches",
      headers: {},
    });
    response.data.forEach(async (launche) => {
      const existingLaunche = await launcheDao.getById(launche.id);
      if (!existingLaunche) {
        await launcheDao.create(launche);
        console.log(`Item inserido: ${launche.name}`);
      }
    });
    console.log(`${new Date()} - Finishing update launches data!`);
  } catch (e) {
    console.error(`${new Date()} - error:`, e);

    let data = JSON.stringify({
      message: `Erro ao sicronizar dados às ${new Date()}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.WEBHOOK}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    if (process.env.WEBHOOK) {
      makeRequest();
    }
  }
}
