"use strict";

const CronJob = require("cron").CronJob;
const axios = require("axios");
const launcheDao = require("../dao/launche-dao");

const job = new CronJob(
  "*/5 * * * *", // minute by minute
  //"0 9 * * *", // hour by hour
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
  }
}
