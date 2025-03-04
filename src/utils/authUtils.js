const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const comparePasswords = async (passwordFromRequest, hashedPassword) => {
  passwordsMatch = await bcrypt.compare(passwordFromRequest, hashedPassword);

  return passwordsMatch;
};

module.exports = { comparePasswords };
