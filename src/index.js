const { app } = require("./server.js");
const { dbConnect } = require("./config/db.js");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
  dbConnect();
});
