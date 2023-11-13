const mongoose = require("mongoose");

require("dotenv").config();

const dbURI = process.env.LINK_TO_ATLAS;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo local db is connected");
  })
  .catch(() => {
    console.log(error);
  });

const db = mongoose.connection;

// Event listeners for the MongoDB connection
db.on("connected", () => {
  console.log(`Connected to MongoDB`);
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Gracefully handle connection termination
process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
});

module.exports = db;
