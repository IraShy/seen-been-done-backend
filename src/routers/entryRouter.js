const express = require("express");
const jwt = require("jsonwebtoken");

const {
  verifyToken,
  authorizeEntryAccess,
} = require("../middleware/authMiddleware");
const { findEntryById } = require("../middleware/entryMiddleware");

const { Entry } = require("../models/entryModel");

const router = express.Router();

// @desc Find all entries
// @route GET /entries/
router.get("/", verifyToken, async (req, res) => {
  try {
    res.json(await Entry.find({ author: req.user.id }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc Find one entry
// @route GET /entries/:id
router.get(
  "/:id",
  verifyToken,
  findEntryById,
  authorizeEntryAccess,
  (req, res) => {
    const { author, ...entryData } = req.foundEntry._doc;
    res.json(entryData);
  }
);

// @desc Create an entry
// @route POST /entries
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    // TODO: check that the end date is not earlier than the start date
    // TODO: if no endDate, should it be the same as startDate or null?

    const entry = await Entry.create({
      title,
      description,
      startDate,
      endDate,
      author: req.user.id,
    });

    res.status(201).json(entry);
  } catch (error) {
    console.log(error);
    // TODO: implement validation checks, then change the status code to 500
    res.status(400).json({ error: error.message });
  }
});

// @desc Update an entry
// @route PUT /entries/:id
router.put(
  "/:id",
  verifyToken,
  findEntryById,
  authorizeEntryAccess,
  async (req, res) => {
    try {
      Object.assign(req.foundEntry, req.body);
      await req.foundEntry.save();
      res.json(req.foundEntry);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// @desc Delete an entry
// @route DELETE /entries/:id
router.delete(
  "/:id",
  verifyToken,
  findEntryById,
  authorizeEntryAccess,
  async (req, res) => {
    try {
      const result = await Entry.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Entry deleted successfully" });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
