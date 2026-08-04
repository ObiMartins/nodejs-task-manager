const express = require("express");

const healthRoutes = require("./routes/healthRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Node.js Task Manager API"
  });
});

app.use("/health", healthRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;
