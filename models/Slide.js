const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  media: { type: String }, // Image/Video URL
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});

module.exports = mongoose.model("Slide", slideSchema);
