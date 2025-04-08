const { validateObjectId } = require("../utils/validators.js");

/**
 *
 * @desc Verify that request params id is a valid MongoDB ObjectId to prevent casting error
 *
 * @returns 400 response if id is invalid
 * @throws 500 response if unexpected error occurs during validation
 */

const validateId = (req, res, next) => {
  try {
    if (!validateObjectId(req.params.id)) {
      console.log("invalid id");
      return res.status(400).json({ error: "Invalid id" });
    }
    next();
  } catch (error) {
    console.log("error wasn't handled in validationMiddleware > validateId");
    console.log(error);
    res.status(500).json({ error: "Unhandled error: " + error.message });
  }
};

module.exports = { validateId };
