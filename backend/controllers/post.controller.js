const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


// Get all posts
module.exports.readPost = (req, res) => {
    PostModel.find((err, data) => {
        if (!err) res.json(data);
        else console.log('Error to get data : ' + err);
    });
};


// Create post
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video
    });

    try {
        const post = await newPost.save();
        return res.status(201).json({ message: 'Posted !', post });
    } catch (err) {
        return res.status(400).json({ message: 'Created post failed', err });
    }
};


// Update post 
module.exports.updatePost = (req, res) => {
    // Params id check (url)
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
            if (!err) res.json({ message: 'Updated !', data });
            else console.log('Update failed : ' + err);
        }
    )
};


// Delete post
module.exports.deletePost = (req, res) => {
    // Params id check (url)
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

    PostModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (!err) res.send(data);
        else console.log('Delete failed : ' + err);
    });
};