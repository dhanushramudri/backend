const express = require('express');
const router = express.Router();
const { createModule, getModules, addQuizToModule, addSlideToModule, getModuleById } = require('../controllers/moduleController');

// ✅ Route to create a module
router.post('/create', createModule);

// ✅ Route to fetch all modules
router.get('/', getModules);

// ✅ Route to fetch a single module by ID
router.get('/:id', getModuleById);

// ✅ Route to add a quiz to a module
router.post('/add-quiz', addQuizToModule);

// ✅ Route to add a slide to a module
router.post('/add-slide', addSlideToModule);

module.exports = router;
