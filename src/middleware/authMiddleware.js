const checkCredentialsPresence = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    const error = new Error("Missing credentials");
    error.status = 400;
    throw error;
  }
  next();
};

module.exports = { checkCredentialsPresence };
