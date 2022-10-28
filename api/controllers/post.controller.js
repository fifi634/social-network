const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const { get } = require('http');


// Get all posts and sort in descending order
module.exports.readPost = (req, res) => {
    PostModel.find((err, data) => {
        if (!err) res.status(200).json(data);
        else console.log('Error to get data : ', err);
    }).sort({ createdAt: -1 });
};


// Create post
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.auth.userId,
        message: req.body.message,
        picture: req.file !== (null || undefined) ? `${req.protocol}://${req.get('host')}/uploads/post/${req.file.filename}` : ''
    }, (err, data) => {
        if(err) return res.status(500).json({message: 'File upload failed.', err});
    });

    try {
        const post = await newPost.save();
        console.log(req.auth.userId + ' has created a new post');
        return res.status(201).json({ message: 'Post created !', post });
    } catch (err) {
        console.log('Created post failed. ', err)
        return res.status(400).json({ message: 'Created post failed', err });
    };
};


// Update post 
module.exports.updatePost = (req, res) => {

    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

    PostModel.findByIdAndUpdate (
        req.params.id,
        { $set: { message: req.body.message }},
        { new: true },
        (err, data) => {
            if (!err) {
                res.json({ message: 'Post updated !', data });
                console.log(req.auth.userId + ' has updated a post');
            } else {
                console.log('Update failed : ', err);
            };
        }
    );
};


// Delete post
module.exports.deletePost = async (req, res) => {

    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('Post not found : ' + req.params.id);

    // Check if it's an admin
    let admin = false;
    let user = await UserModel.findOne({_id: req.auth.userId});
    if (user.admin_role === true) admin = true;

    PostModel.findOne({_id: req.params.id})
        .then((post) => {

            // Check if it's the original creater and is it's not an admin
            if(post.posterId != req.auth.userId && admin === false) {
                res.status(403).json({ message: 'Unauthorized user for del post'});

            // If picture in post, erase it    
            } else if(post.picture !==  undefined) {                
                const filename = post.picture.split('/uploads/post/')[1];
                fs.unlink(`./uploads/post/${filename}`, () => {

                    // Erase post from database
                    PostModel.findByIdAndDelete(req.params.id, (err, data) => {
                        if (!err) {
                            console.log(req.auth.userId + ' has deleted a post');
                            res.status(200).json({ message: 'Post succesfully deleted !', data });
                        } else {
                            console.log('Delete failed : ', err);
                        };
                    });
                });
            };
        })
        .catch((err) => {
            console.log('Del post failed. ', err);
            res.status(500).json({ message: 'Del post failed. ', err });
        })
    ;
};