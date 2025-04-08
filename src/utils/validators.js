/**
 *
 * @desc Validate parameter as a MongoDB ObjectId
 *
 * @returns Boolean: true if valid ObjectId, false otherwise
 */

const mongoose = require("mongoose");

const validateObjectId = (id) => {
  return mongoose.isValidObjectId(id);
};

module.exports = { validateObjectId };
