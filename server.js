const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config(); // ✅ Load environment variables FIRST

const app = express();
const crypto = require("crypto");
console.log(crypto.randomBytes(32).toString("base64"));
// ✅ Set Mongoose strictQuery (avoids deprecation warning)
mongoose.set("strictQuery", false);

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// ✅ Import Routes
const moduleRoutes = require("./routes/moduleRoutes");
const quizRoutes = require("./routes/quizRoutes");
const progressRoutes = require("./routes/progressRoutes");
const authRoutes = require("./routes/authRoutes"); // User authentication routes

// Default Route (Backend Home Page)
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Training Platform API",
    status: "Server is running",
    availableRoutes: {
      "/api/modules": "Get a list of available training modules",
      "/api/quizzes": "Get a list of available quizzes",
      "/api/progress": "Get user progress data",
      "/api/auth": "User authentication endpoints",
    },
    version: "1.0.0",
    documentation: "For more information, refer to the API documentation.",
  });
});
// ✅ Use Routes
app.use("/api/modules", moduleRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/auth", authRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Training Platform API is running...");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  });
