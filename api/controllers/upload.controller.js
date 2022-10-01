const UserModel = require('../models/user.model');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors.utils');


exports.uploadProfil = (req, res, next) => {    
    UserModel.findOne({ _id: req.auth.userId })
        .then( async (user) => {

            // Check if it's the original user want to delete file
            if (user._id != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized'});
            } else {

                // Erase old avatar files from server  
                fs.unlink(
                    `../client/public/${user.avatar_slug}`,
                    (err => err ? console.log('Avatar delete error : ', err) : console.log('Old avatar deleted'))
                );

                // Link a new avatar in database
                UserModel.updateOne(
                    { _id: req.auth.userId}, 
                    { $set: {avatar_slug: './uploads/profil/' + req.file.filename}}
                )
                    .then(() => {
                        res.json({ message: 'New avatar updated !' });
                        console.log(user.pseudo + ' has a new avatar')
                    })
                    .catch((err => res.status(401).json({ message: 'Upload new avatar failed'})))
                ;
            }
        })
        .catch(err => res.status(500).json({ message: 'Change avatar failed', err}))
    ;
};
