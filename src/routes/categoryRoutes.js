const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', categoryController.getAllCategories);

router.post('/', authMiddleware, roleMiddleware, categoryController.createCategory);

module.exports = router;