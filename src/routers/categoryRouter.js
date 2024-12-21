const express = require("express");

const { Category } = require("../models/categoryModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await Category.find({}));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
