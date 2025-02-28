const express = require("express");

const { Entry } = require("../models/entryModel");

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
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
    } else {
      res.json(entry);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc Create an entry
// @route POST /entries
router.post("/", async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

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
