const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/create-post', (req, res) => {
    res.render('createPost');
});

router.get('/post/:id', (req, res) => {
    res.render('postDetail', { postId: req.params.id }); 
});

router.get('/user/:id', (req, res) => {
    res.render('publicProfile', { targetUserId: req.params.id }); 
});

module.exports = router;