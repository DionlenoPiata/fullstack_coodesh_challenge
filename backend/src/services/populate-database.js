"use strict";

const axios = require("axios");
const launcheDao = require("../dao/launche-dao");

exports.start = async () => {
  const launches = await launcheDao.get();

  if (launches && launches.totalDocs === 0) {
    console.log(`${new Date()} - Populate database...`);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.spacexdata.com/v5/launches",
      headers: {},
    };

    try {
      const { data } = await axios.request(config);
      console.log("Starting populate data...");
      data.map((launche) => {
        launcheDao.create(launche);
      });
      console.log("Finishing populate data!");
    } catch (error) {
      console.log(error);
    }
  }
};
