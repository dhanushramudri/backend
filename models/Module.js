const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  slides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slide" }], // Linked slides
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }], // Linked quizzes
  videos: [{ type: String }] // Array of video URLs
});

module.exports = mongoose.model("Module", moduleSchema);
