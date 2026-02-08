const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

exports.createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        
        const newPost = new Post({
            title,
            content,
            category,
            author: req.user.id 
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        let sortOption = { createdAt: -1 }; 
        
        if (sort === 'oldest') {
            sortOption = { createdAt: 1 }; 
        } else if (sort === 'popular') {
            sortOption = { views: -1 };  
        } else if (sort === 'likes') {
             sortOption = { views: -1 };
        }

        const posts = await Post.find(query)
            .populate('author', ['username', 'avatar'])
            .populate('category', ['name'])
            .sort(sortOption);
            
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            { $inc: { views: 1 } }, 
            { new: true } 
        )
        .populate('author', ['username', 'avatar'])
        .populate('category');

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const comments = await Comment.find({ post: req.params.id })
            .populate('author', ['username'])
            .sort({ createdAt: -1 });

        const likeCount = await Like.countDocuments({ post: req.params.id });

        res.json({ post, comments, likeCount });
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.deleteOne();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const existingLike = await Like.findOne({ post: req.params.id, user: req.user.id });

        if (existingLike) {
            await existingLike.deleteOne();
            return res.json({ msg: 'Post unliked' });
        }

        const newLike = new Like({
            post: req.params.id,
            user: req.user.id
        });
        await newLike.save();
        res.json({ msg: 'Post liked' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const newComment = new Comment({
            content: req.body.content,
            post: req.params.id,
            author: req.user.id
        });

        await newComment.save();

        await newComment.populate('author', ['username']); 

        res.json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('post');

        if (!comment) return res.status(404).json({ msg: 'Comment not found' });

        const isCommentAuthor = comment.author.toString() === req.user.id;
        const isPostAuthor = comment.post.author.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';

        if (!isCommentAuthor && !isPostAuthor && !isAdmin) {
            return res.status(401).json({ msg: 'Not authorized to delete this comment' });
        }

        await comment.deleteOne();
        res.json({ msg: 'Comment deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.editComment = async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findById(req.params.id);

        if (!comment) return res.status(404).json({ msg: 'Comment not found' });

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        comment.content = content;
        comment.isEdited = true; 
        await comment.save();

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};