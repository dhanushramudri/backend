const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Static file serving
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/user", require("./routes/useRouter.js"));
app.use("/api", require("./routes/taskRouter.js"));

// Root route
app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

// MongoDB connection
const MONGO_URI = process.env.MANGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Export the app for Vercel
module.exports = app;
