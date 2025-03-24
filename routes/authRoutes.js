const express = require('express');
const { registerUser, loginUser, getUserProfile, getUserProfileByID } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', protect, getUserProfile);

router.get('/:id', protect, getUserProfileByID);

module.exports = router;
