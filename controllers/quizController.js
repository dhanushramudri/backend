const Quiz = require("../models/Quiz");
const Module = require("../models/Module"); // ✅ Import the Module model

// Add a quiz to a module
exports.addQuiz = async (req, res) => {
    try {
        console.log("📩 Received data:", req.body); // Debugging

        const { moduleId, title, questions } = req.body;

        if (!moduleId || !title || !questions || questions.length === 0) {
            return res.status(400).json({ message: "Module ID, title, and questions are required" });
        }

        // ✅ Check if moduleId exists in the database
        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        // ✅ Create and save the quiz
        const newQuiz = new Quiz({ moduleId, title, questions });
        await newQuiz.save();

        res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });

    } catch (error) {
        console.error("⚠️ Backend Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;

        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Title and questions are required' });
        }

        const newQuiz = new Quiz({
            title,
            questions
        });

        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ✅ Function to get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find(); // Fetch all quizzes from DB
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createQuiz, getQuizzes };

// Ensure both functions are exported
