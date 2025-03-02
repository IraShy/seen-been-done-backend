const express = require("express");
const jwt = require("jsonwebtoken");

const { Entry } = require("../models/entryModel");
const { User } = require("../models/userModel");

const authUser = (req, res, next, token) => {
  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      //   err = {
      //     name: 'NotBeforeError',
      //     message: 'jwt not active',
      //     date: 2018-10-04T16:10:44.000Z
      //   }
      console.log(err.name);

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: err.message });
      }
    } else {
      console.log("valid token");
    }
  });
};

const router = express.Router();

// @desc Find all entries
// @route GET /entries/
router.get("/", async (req, res) => {
  try {
    res.json(await Entry.find({}));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc Find one entry
// @route GET /entries/:id
router.get("/:id", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      console.log("No Auth");
      return res.status(401).json({ error: "No token provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    const foundEntry = await Entry.findById(req.params.id);
    if (!foundEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    if (foundEntry.author.toString() != decoded.id) {
      console.log("User is not author of the entry");
      res.status(403).json({ error: "Access denied" });
    } else {
      const { author, ...entryData } = foundEntry._doc;
      res.json(entryData);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// @desc Create an entry
// @route POST /entries
router.post("/", async (req, res) => {
  try {
    const { title, description, startDate, endDate, author } = req.body;

    // TODO: check that the end date is not earlier than the start date
    // TODO: if no endDate, should it be the same as startDate or null?

    const entry = await Entry.create({
      title,
      description,
      startDate,
      endDate,
    });
    if (!entry) {
      res.status(400).json({ error: "Error creating an entry" });
    } else {
      res.status(201).json(entry);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// @desc Update an entry
// @route PUT /entries/:id
router.put("/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
    } else {
      res.json(entry);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete an entry
// @route DELETE /entries/:id
router.delete("/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    console.log(entry);
    // const entry = await Entry.findOneAndDelete({ id: req.params.id });
    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc
// @route

module.exports = router;
