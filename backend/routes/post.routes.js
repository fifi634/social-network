const router = require('express').Router();

const Post = require('../models/post.model');

router.post('/', (req ,res, next) => {
    console.log(req.body);
    res.status(201).json({ message: 'Post created :)'});
});