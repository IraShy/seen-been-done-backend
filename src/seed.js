const { dbConnect, dbDrop, dbDisconnect } = require("./config/db");
const { User } = require("./models/userModel.js");

const seedUsers = async () => {
  const users = [
    {
      email: "user1@example.com",
      password: "password",
    },
    {
      email: "user2@example.com",
      password: "password",
    },
  ];

  const seededUsers = await User.insertMany(users);
  console.log("Users seeded");
  console.log(seededUsers);
};

const seedDB = async () => {
  await dbConnect();
  await dbDrop();

  await seedUsers();

  await dbDisconnect();
};

seedDB();
