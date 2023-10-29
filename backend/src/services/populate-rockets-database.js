"use strict";

const axios = require("axios");
const rocketDao = require("../dao/rocket-dao");

exports.start = async () => {
  await populate();
};

async function populate() {
  const rockets = await rocketDao.get();

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
      populate();
    }
  }
}
