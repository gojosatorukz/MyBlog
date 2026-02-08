const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

router.post('/', authMiddleware, postController.createPost);
router.delete('/:id', authMiddleware, postController.deletePost);

router.put('/like/:id', authMiddleware, postController.likePost); 
router.post('/comment/:id', authMiddleware, postController.addComment); 

router.delete('/comment/:id', authMiddleware, postController.deleteComment); 
router.put('/comment/:id', authMiddleware, postController.editComment);    

module.exports = router;