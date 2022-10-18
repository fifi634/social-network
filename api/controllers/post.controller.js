const PostModel = require('../models/post.model');
const ObjectID = require('mongoose').Types.ObjectId;


// Get all posts
module.exports.readPost = (req, res) => {
    PostModel.find((err, data) => {
        if (!err) res.json(data);
        else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1 });
};


// Create post
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.auth.userId,
        message: req.body.message,
        // video: req.body.video,
        picture: req.file !== (null || undefined) ? './uploads/post/' + req.file.filename : ''
    }, (err, data) => {
        if(err) return res.status(500).json({message: 'File upload failed.', err});
    });

    try {
        const post = await newPost.save();
        console.log(req.auth.userId + ' has created a new post');
        return res.status(201).json({ message: 'Post created !', post });
    } catch (err) {
        return res.status(400).json({ message: 'Created post failed', err });
    }
};


// Update post 
module.exports.updatePost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

    const updatedRecord = { 
        message: req.body.message
    };

    PostModel.findByIdAndUpdate (
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, data) => {
            if (!err) {
                res.json({ message: 'Post updated !', data });
                console.log(req.auth.userId + ' has updated a post');
            } else {
                console.log('Update failed : ' + err);
            }
        }
    )
};


// Delete post
module.exports.deletePost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('Post not found : ' + req.params.id);

    PostModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (!err) {
            console.log(req.auth.userId + ' has deleted a post');
            res.json({ message: 'Post succesfully deleted !', data });
        } else {
            console.log('Delete failed : ' + err);
        } 
    });
};