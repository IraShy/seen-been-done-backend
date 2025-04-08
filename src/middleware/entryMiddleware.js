const { Entry } = require("../models/entryModel");

/**
 * @desc Find an entry by ID and attach it to the req
 *
 * @returns 404 response if entry is not found
 * @throws 500 if unexpected error occurs
 */
const findEntryById = async (req, res, next) => {
  try {
    req.foundEntry = await Entry.findById(req.params.id);
    if (!req.foundEntry) {
      console.log("Entry not found");
      return res.status(404).json({ error: "Entry not found" });
    }
    next();
  } catch (error) {
    console.log("error wasn't handled in entryMiddleware > findEntryById");
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports = { findEntryById };
