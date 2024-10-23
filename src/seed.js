const { dbConnect, dbDrop, dbDisconnect } = require("./config/db");

// TODO;
async function seedDB() {
  await dbConnect();
  await dbDrop();
  // seeding
  await dbDisconnect();
}

seedDB();
