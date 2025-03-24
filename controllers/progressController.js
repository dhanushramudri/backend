// controllers/progressController.js
const Progress = require("../models/progressModel");
const mongoose = require("mongoose");

// Start module progress
exports.startModule = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const userId = req.user.id;

    let progress = await Progress.findOne({ userId, moduleId });
    if (!progress) {
      progress = new Progress({ userId, moduleId });
      await progress.save();
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update progress
exports.updateProgress = async (req, res) => {
  try {
    const { moduleId, slideId, quizId } = req.body;
    const userId = req.user.id;

    let progress = await Progress.findOne({ userId, moduleId });
    if (!progress) return res.status(404).json({ error: "Progress not found" });

    if (slideId && !progress.slidesCompleted.includes(slideId)) {
      progress.slidesCompleted.push(slideId);
    }
    if (quizId && !progress.quizzesCompleted.includes(quizId)) {
      progress.quizzesCompleted.push(quizId);
    }

    const totalItems = progress.totalSlides + progress.totalQuizzes;
    const completedItems = progress.slidesCompleted.length + progress.quizzesCompleted.length;
    progress.progressPercentage = (completedItems / totalItems) * 100;
    await progress.save();

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user progress
exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { moduleId } = req.params;
    const progress = await Progress.findOne({ userId, moduleId });
    if (!progress) return res.status(404).json({ message: "No progress found" });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
