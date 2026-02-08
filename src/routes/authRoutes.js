const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

const { rateLimit } = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 5,
    message: { msg: "Too many login attempts. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', loginLimiter, userController.register);
router.post('/login', loginLimiter, userController.login);

module.exports = router;