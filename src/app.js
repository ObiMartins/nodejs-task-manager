const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Node.js Task Manager API"
  });
});

module.exports = app;
