const PostModel = require('../models/post.model');
const ObjectID = require('mongoose').Types.ObjectId;


// Create comment, add it in commentary array into post
exports.commentPost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });
    
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            { $push : { comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.commenterPseudo,
                text: req.body.text,
                timestamp: new Date().getTime()
            }}},
            { new: true },
            (err, data) => {
                if (!err) return res.json({ message: 'Commentary add !', data });
                else return res.status(400).json({ message: 'Create commentary failed', err });
            }
        )
    } catch (err) {
        return res.status(400).json({ message: 'Create commentary error', err });
    }
};


// Edit comment
exports.editCommentPost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

    try {
        return PostModel.findById(
            req.params.id,
            (err, data) => {
                // Search comment
                const theComment = data.comments.find((comment) => 
                    comment._id.equals(req.body.commentId)
                );
                if (!theComment) return res.status(404).json({ message: 'Comment not found' });
                theComment.text = req.body.text;

                // Save update comment
                return data.save((err) => {
                    if (!err) return res.status(200).json({ message: 'Comment updated !', data });
                    return res.status(500).json({ message: 'Update commentary failed', err });
                });
            }
        )    
    } catch (err) { 
        return res.status(400).json({ message: 'Update commentary error', err }); 
    }
};


exports.deleteCommentPost = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { comments: { _id: req.body.commentId }}},
            { new: true },
            (err, data) => {
                if (!err) return res.json({ message: 'Commentary deleted', data });
                else return res.status(400).json({ message: 'Erase comment from post commentary array failed', err });
            }
        );
    } catch (err) { 
        return res.status(400).json({ message: 'Delete commentary failed', err }); 
    }
};