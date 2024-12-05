const express = require("express");
const { User } = require("../models/userModel");

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
    }
    res.send(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Register a user
// POST /users/
router.post("/", async (req, res) => {
  try {
    let user = await User.create(req.body);
    if (!user) {
      res.status(400).json({ error: "Error registering user" });
    }
    res.send(user);
  } catch {
    res.status(400).json({ error: "Error registering user" });
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
