const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    moduleId: { type: String, required: true },
    slidesCompleted: { type: [Number], default: [] },
    quizCompleted: { type: Boolean, default: false },
});

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
