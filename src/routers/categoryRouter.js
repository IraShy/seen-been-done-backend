const express = require("express");

const { Category } = require("../models/categoryModel");

const router = express.Router();

// @desc Find all categories
// @route GET /categories/
router.get("/", async (req, res) => {
  try {
    res.json(await Category.find({}));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// @desc Find one category by ID
// @route GET /categories/:id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// @desc Create a new category
// @route POST /categories/
router.post("/", async (req, res) => {
  try {
    let category = await Category.create(req.body);

    if (!category) {
      res.status(400).json({ error: "Error creating category" });
    } else {
      console.log("CATEGORY:", category);
      res.status(201).json(category);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc Update a category
// @route PUT /categories/:id
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
