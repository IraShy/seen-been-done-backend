const { app } = require("./server.js");
const { dbConnect } = require("./config/db.js");

// Check for JWT_KEY environment variable
if (!process.env.JWT_KEY) {
  console.error("FATAL ERROR: JWT_KEY environment variable is missing");
  process.exit(1);
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
  dbConnect();
});
