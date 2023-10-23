"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    flight_number: {
      type: Number,
      require: true,
    },
    links: {
      patch: {
        small: {
          type: String,
          required: true,
        },
      },
      webcast: {
        type: String,
        required: true,
      },
    },
    name: {
      type: String,
      required: true,
    },
    date_utc: {
      type: Date,
      require: true,
    },
    rocket: {
      type: String,
      required: true,
    },
    rocket_name: {
      type: String,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    cores: [
      {
        reused: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Launche", schema);
