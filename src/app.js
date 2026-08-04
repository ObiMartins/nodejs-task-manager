const express = require("express");

const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Node.js Task Manager API"
  });
});

// Health endpoint
app.use("/health", healthRoutes);

module.exports = app;
