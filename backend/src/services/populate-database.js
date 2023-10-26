"use strict";

const axios = require("axios");
const launcheDao = require("../dao/launche-dao");
const rocketDao = require("../dao/rocket-dao");

exports.start = async () => {
  const launches = await launcheDao.get();
  const rockets = await rocketDao.get();

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
    }
  }

  if (rockets && rockets.totalDocs === 0) {
    console.log(`${new Date()} - Populate database: Rockets...`);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.spacexdata.com/v4/rockets",
    };

    try {
      const { data } = await axios.request(config);
      console.log("Starting populate rockets data...");
      data.map((rocket) => {
        rocketDao.create(rocket);
      });
      console.log("Finishing populate rockets data!");
    } catch (error) {
      console.log(error);
    }
  }
};
