const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const { rateLimit } = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 5, 
    message: { msg: "Too many login attempts. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', authLimiter, userController.register);
router.post('/login', authLimiter, userController.login);

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;