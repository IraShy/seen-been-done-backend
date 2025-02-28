const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {
  response.json({
    message: "Home page",
  });
});

const userRouter = require("./routers/userRouter.js");
const categoryRouter = require("./routers/categoryRouter.js");
const entryRouter = require("./routers/entryRouter.js");
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/entries", entryRouter);

app.get("*", (request, response, next) => {
  response.status(404).json({
    message: "Page not found",
  });
});

app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    message: "Error occured",
    error: error.message,
  });
});

module.exports = { app };
