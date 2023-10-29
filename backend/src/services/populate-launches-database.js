"use strict";

const axios = require("axios");
const launcheDao = require("../dao/launche-dao");

exports.start = async () => {
  await populate();
};

async function populate() {
  const launches = await launcheDao.get();

  if (launches && launches.totalDocs === 0) {
    console.log(`${new Date()} - Populate database: Launches...`);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.spacexdata.com/v5/launches",
    };

    try {
      const { data } = await axios.request(config);
      console.log("Starting populate launches data...");
      data.map((launche) => {
        launcheDao.create(launche);
      });
      console.log("Finishing populate launches data!");
    } catch (error) {
      console.log(error);
      populate();
    }
  }
}
