const jwt = require("jsonwebtoken");

/**
 *
 * @desc Check if email and password are provided in the request body
 * @throws 400 if credentials are missing
 */
const checkCredentialsPresence = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  next();
};

/**
 * @desc Verify JWT from Authorization header
 * @throws 401 if token is missing, expired, or invalid
 */
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

/**
 *
 * @@desc Verify that authenticated user is the author of the entry
 * @throws 403 if the user is not the author
 */
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
