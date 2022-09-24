const router = require('express').Router();
// Midlewares
const auth = require('../middleware/auth.middleware');
// Models
const Post = require('../models/post.model');

router.post('/', auth, (req ,res, next) => {
    console.log(req.body);
    res.status(201).json({ message: 'Post created :)'});
});