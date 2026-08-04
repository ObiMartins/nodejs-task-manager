const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:");
    console.error(error);
  });

module.exports = mongoose;
