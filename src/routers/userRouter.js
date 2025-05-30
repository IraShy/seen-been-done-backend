const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models/userModel");
const { comparePasswords } = require("../utils/authUtils");
const { checkCredentialsPresence } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc Find all users
// @route GET /users/
router.get("/", async (req, res) => {
  try {
    res.json(await User.find({}));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// @desc Find one user by ID
// @route GET /users/:id
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

// @desc Register a user
// @route POST /users/
router.post("/", checkCredentialsPresence, async (req, res) => {
  try {
    const { email, password, admin } = req.body;
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);

    let user = await User.create({ email, password: hash, admin });

    if (!user) {
      res.status(400).json({ error: "Error registering user" });
    } else {
      console.log("USER:", user);
      const { password, ...userData } = user._doc;
      res.status(201).json(userData);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc Login
// @route POST /users/login

router.post("/login", checkCredentialsPresence, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
      console.log("Invalid password");
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const payload = {
      id: user._id,
      admin: user.admin,
    };
    const expiresIn = "2h";
    // const expiresIn = 5;
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn });
    console.log(`${user.email} signed in!\nToken: ${token}`);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc Update a user
// @route PUT /users/:id
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
