const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes } = require('../controllers/quizController');

// Route to create a quiz (POST request)
router.post('/create', createQuiz);

// ✅ Route to fetch all quizzes (GET request)
router.get('/', getQuizzes);

module.exports = router;
