const Module = require('../models/Module');
const Quiz = require('../models/Quiz');
const Slide = require('../models/Slide');

const getModuleById = async (req, res) => {
    try {
        const module = await Module.findById(req.params.id)
            .populate("slides")  // ✅ Ensure slides are populated
            .populate("quizzes"); // ✅ Ensure quizzes are populated

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





const addSlide = async (req, res) => {
    try {
        const { moduleId, title, content, media } = req.body;

        if (!moduleId || !title || !content) {
            return res.status(400).json({ message: "Module ID, title, and content are required" });
        }

        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        const newSlide = new Slide({ title, content, media, moduleId });
        await newSlide.save();

        module.slides.push(newSlide._id);
        await module.save();

        res.status(201).json({ message: "Slide added successfully", slide: newSlide });
    } catch (error) {
        console.error("Error adding slide:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Create a Module (Already exists)
const createModule = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and Description are required' });
        }

        const newModule = new Module({ title, description });
        await newModule.save();

        res.status(201).json(newModule);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ✅ Get all modules (Already exists)
const getModules = async (req, res) => {
    try {
        const modules = await Module.find().populate('slides quizzes'); // Populate quizzes and slides
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ✅ Add a Quiz to a Module
const addQuizToModule = async (req, res) => {
    try {
        const { moduleId, title, questions } = req.body;
        if (!moduleId || !title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Module ID, title, and questions are required' });
        }

        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();

        module.quizzes.push(newQuiz._id);
        await module.save();

        res.status(201).json({ message: 'Quiz added successfully', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ✅ Add a Slide to a Module
const addSlideToModule = async (req, res) => {
    try {
        const { moduleId, title, content, media } = req.body;
        if (!moduleId || !title) {
            return res.status(400).json({ message: 'Module ID and title are required' });
        }

        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const newSlide = new Slide({ title, content, media, moduleId });
        await newSlide.save();

        module.slides.push(newSlide._id);
        await module.save();

        res.status(201).json({ message: 'Slide added successfully', slide: newSlide });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createModule, getModules, addQuizToModule, addSlideToModule,getModuleById,addSlide};
