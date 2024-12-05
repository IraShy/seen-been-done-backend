const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");

// const secretKey = process.env.JWT_KEY

const router = express.Router();

// Find all users
// GET /users/
router.get("/", async (req, res) => {
  res.json(await User.find({}));
});

// Find one user by ID
// GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Register a user
// POST /users/
router.post("/", async (req, res) => {
  try {
    const { email, password, admin } = req.body;
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    // let user = await User.create(req.body);
    let user = await User.create({ email, password: hash, admin });
    if (!user) {
      res.status(400).json({ error: "Error registering user" });
    } else {
      console.log("USER:", user);
      // res.status(201).json(user);
      const { password, ...userData } = user._doc;
      res.status(201).json(userData);
    }
  } catch (err) {
    // res.status(400).json({ error: "Error registering user" });
    res.status(400).json({ error: err.message });
  }
});

// TODO: Login
// POST /users/login

// Update a user
// PUT /users/:id
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
