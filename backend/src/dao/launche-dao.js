"use strict";

const mongoose = require("mongoose");
const Document = mongoose.model("Launche");

exports.get = async (search, page = 1, limit = process.env.LIMIT) => {
  let query = {};

  const containsFailure = /falha/i.test(search);
  const containsSuccess = /sucesso/i.test(search);

  if (search) {
    query = {
      $or: [{ name: { $regex: search, $options: "i" } }],
    };

    if (containsFailure) {
      query = {
        $or: [{ success: false }],
      };
    }
    if (containsSuccess) {
      query = {
        $or: [{ success: true }],
      };
    }
  }

  let queries = [
    Document.find(query)
      .skip(parseInt((page - 1) * limit))
      .limit(parseInt(limit))
      .populate("rocket")
      .sort({ flight_number: -1 }),
    Document.countDocuments(query),
  ];
  let queriesResult = await Promise.all(queries);

  let res = {};
  res["result"] = queriesResult[0];
  res["totalDocs"] = queriesResult[1];
  res["totalPages"] = Math.ceil(queriesResult[1] / limit);

  return res;
};

exports.getById = async (id) => {
  let res = await Document.findById(id);
  return res;
};

exports.countAllByQuery = async (query) => {
  let res = await Document.countDocuments(query);
  return res;
};

exports.getAllGroupedByYear = async () => {
  let res = await Document.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date_utc" },
          rocket: "$rocket",
        },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "rockets",
        localField: "_id.rocket",
        foreignField: "_id",
        as: "rocketInfo",
      },
    },
    {
      $unwind: "$rocketInfo",
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        rocketId: "$_id.rocket",
        name: "$rocketInfo.name",
        count: 1,
      },
    },
    {
      $group: {
        _id: "$year",
        rockets: {
          $push: {
            id: "$rocketId",
            name: "$name",
            count: "$count",
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return res;
};

exports.create = async (data) => {
  var document = new Document(data);
  const res = await document.save();
  return res;
};
