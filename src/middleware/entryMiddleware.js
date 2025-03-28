const { Entry } = require("../models/entryModel");

/**
 * @desc Find an entry by ID and attach it to the req
 * @throws 404 if entry is not found
 */
const findEntryById = async (req, res, next) => {
  try {
    req.foundEntry = await Entry.findById(req.params.id);
    if (!req.foundEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports = { findEntryById };
