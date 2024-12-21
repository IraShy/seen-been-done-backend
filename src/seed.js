const { dbConnect, dbDrop, dbDisconnect } = require("./config/db");
const { Category } = require("./models/categoryModel.js");
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
    {
      email: "admin@example.com",
      password: "password",
      admin: true,
    },
  ];

  const seededUsers = await User.insertMany(users);
  console.log("Users seeded");
  console.log(seededUsers);
};

const seedCategories = async () => {
  const categories = [
    {
      name: "travel",
      description: "Wherever you go",
    },
    {
      name: "sport",
    },
    {
      name: "adventure",
    },
    {
      name: "art & culture",
    },
  ];

  const seededCategories = await Category.insertMany(categories);
  console.log("Categories seeded");
  console.log(seededCategories);
};

const seedDB = async () => {
  await dbConnect();
  await dbDrop();

  await seedUsers();
  await seedCategories();

  await dbDisconnect();
};

seedDB();
