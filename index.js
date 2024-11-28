const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
const allowedOrigins = [
  "https://frontend-umber-alpha.vercel.app", // Frontend deployment URL
  "http://localhost:3000", // Local development URL (optional)
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from allowed origins or no origin (Postman, curl)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies or credentials in requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

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
  res.status(200).send("Hello, world!");
});

// MongoDB connection
const MONGO_URI = process.env.MANGO_URI; // Corrected variable name
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

// Export the app for Vercel
module.exports = app;
