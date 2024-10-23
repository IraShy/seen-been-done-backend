const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function dbConnect() {
  const env = process.env.NODE_ENV || "development";
  const dbUri =
    env === "production"
      ? process.env.DB_URI_PROD
      : env === "test"
      ? process.env.DB_URI_TEST ||
        "mongodb://localhost:27017/seen-been-done-test"
      : process.env.DB_URI_DEV || "mongodb://localhost:27017/seen-been-done";

  await mongoose.connect(dbUri);
  console.log("DB connected");
}

async function dbDisconnect() {
  await mongoose.connection.close();
  console.log("DB  disconected");
}

async function dbDrop() {
  await mongoose.connection.db.dropDatabase();
  console.log("DB  cleared");
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbDrop,
};
