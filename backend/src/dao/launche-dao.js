"use strict";

const mongoose = require("mongoose");
const Document = mongoose.model("Launche");

exports.get = async () => {
  let res = await Document.find({});
  return res;
};

exports.create = async (data) => {
  var document = new Document(data);
  const res = await document.save();
  return res;
};
