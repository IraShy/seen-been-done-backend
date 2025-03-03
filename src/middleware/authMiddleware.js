const jwt = require("jsonwebtoken");

const checkCredentialsPresence = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    const error = new Error("Missing credentials");
    error.status = 400;
    throw error;
  }
  next();
};

// @desc verify jwt sent for authorization
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("No Auth");
    return res.status(401).json({ error: "No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

// @desc verify that user is the author of the entry
const authorizeEntryAccess = (req, res, next) => {
  if (req.foundEntry.author.toString() != req.user.id) {
    console.log("User is not author of the entry");
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = {
  checkCredentialsPresence,
  verifyToken,
  authorizeEntryAccess,
};
