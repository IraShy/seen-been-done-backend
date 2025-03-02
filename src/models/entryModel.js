const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  // categories: [{
  //   type: String,
  //   required: true,
  //   unique: false,
  // }],
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  // TODO:
  // user, tags, chared with, done together with
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = { Entry };
