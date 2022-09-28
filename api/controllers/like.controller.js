const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


// Like post : add user's id in post's like array into user, and add post's id in user's id like array into post
exports.likePost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.likerId }},
            { new: true },
            (err, data) => { 
                if (err) return res.status(400).json({ 
                    message : "Add user's like into like post array failed", err 
                }); 
            }
        );
        UserModel.findByIdAndUpdate(
            req.body.likerId,
            { $addToSet: { likes: req.params.id }},
            { new: true },
            (err, data) => {
                if (!err) res.json({ message: 'Liked !', data });
                else return res.status(400).json({ 
                    message: "Add post's like into user like's array failed", err 
                });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: "Like failed", err });
    }

};


// Unlike post : delete user's id in post's like array into user, and delete post's id in user's id like array into post
exports.unlikePost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.likerId }},
            { new: true },
            (err, data) => { 
                if (err) return res.status(400).json({ 
                    message : "Delete user's like into like post array failed", err 
                }); 
            }
        );
        UserModel.findByIdAndUpdate(
            req.body.likerId,
            { $pull: { likes: req.params.id }},
            { new: true },
            (err, data) => {
                if (!err) res.json({ message: 'Unliked !', data });
                else return res.status(400).json({ 
                    message: "Delete post's like into user like's array failed", err 
                });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: "Unlike failed", err });
    }  
};