require("dotenv").config();
const express = require("express");

// Connect to MongoDB
require("./db/mongoose");

const healthRoutes = require("./routes/healthRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to the Node.js Task Manager API Testing",
  
  });

});

app.use("/health", healthRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;
