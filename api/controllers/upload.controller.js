const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;


exports.uploadProfil = (req, res, next) => {  
    UserModel.findOne({ _id: req.auth.userId })
        .then( async (user) => {
            const oldFilePath = `../client/public/${user.avatar_slug}`; 
            
            // Check if it's the original user want to update file avatar
            if (user._id != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized'});
            } else {

                // If not default avatar and if it's file exist, erase it
                if (oldFilePath.includes('avatar') === false && fs.existsSync(oldFilePath)) {
                    fs.unlink(
                        oldFilePath,
                        (err => err ? console.log('Avatar delete error (from upload controller). ', err) : console.log('Old avatar deleted (from upload controller)'))
                    );
                }

                // Link a new avatar in database
                UserModel.findByIdAndUpdate({ _id: req.auth.userId }, { $set: {
                    avatar_slug: 'uploads/profil/' + req.file.filename
                }})
                    .then((data) => {
                        console.log(user._id + ' to a new avatar');
                        res.status(201).json({ message: 'New avatar uploaded complete.', data });                      
                    })
                    .catch((err) => {
                        console.log('New avatar link failed. ', err);
                        res.status(500).json({ message: 'New avatar link failed. ', err });
                    })
                ;
            }
        })
        .catch((err) => {
            console.log('Change avatar failed. ', err);
            const errors = uploadErrors(err);
            res.status(500).json({ message: 'Change avatar failed', errors});
        })
    ;
};



exports.uploadPost = (req, res, next) => {  
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

    PostModel.findOne({ _id: req.params.id })
        .then( async (post) => {
            const oldFilePath = `../client/public/${post.picture}`; 
            
            // Check if it's the original user want to update file avatar
            if (post.posterId != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized'});
            } else {

                // If not default avatar and if it's file exist, erase it
                if (oldFilePath.includes('avatar') === false && fs.existsSync(oldFilePath)) {
                    fs.unlink(
                        oldFilePath,
                        (err => err ? console.log('Avatar delete error (from upload controller). ', err) : console.log('Old avatar deleted (from upload controller)'))
                    );
                }
            }
        })
        .then((post) => {
            // Link a new avatar in database
            PostModel.findByIdAndUpdate({ 
                _id: req.params.id, 
                $set: { picture: 'uploads/post/' + req.file.filename }
            })
                .then((data) => {
                    console.log(post._id + ' have new picture');
                    res.status(201).json({ message: 'New post picture uploaded.', data });                      
                })
                .catch((err) => {
                    console.log('New post picture link failed. ', err);
                    res.status(500).json({ message: 'New post picture link failed. ', err });
                })
            ;
        })
        .catch((err) => {
            console.log('Change avatar failed. ', err);
            const errors = uploadErrors(err);
            res.status(500).json({ message: 'Change avatar failed', errors });
        })
    ;
};