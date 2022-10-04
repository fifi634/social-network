const UserModel = require('../models/user.model');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors.utils');


exports.uploadProfil = (req, res, next) => {  
    UserModel.findOne({ _id: req.auth.userId })
        .then( async (user) => {
            const oldFilePath = `../client/public/${user.avatar_slug}`; 
        
            // Check if it's the original user want to delete file and if old files exist for erase it
            if (user._id != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized'});
            } else {
                if (fs.existsSync(oldFilePath)) {
                    fs.unlink(
                        oldFilePath,
                        (err => err ? console.log('Avatar delete error : ', err) : console.log('Old avatar deleted !'))
                    );
                }

                // Link a new avatar in database
                UserModel.updateOne({ _id: req.auth.userId }, { $set: {
                    avatar_slug: './uploads/profil/' + req.file.filename
                }})
                    .then(() => {
                        res.json({ message: 'New avatar uploaded complete !' });
                        console.log(user._id + ' to a new avatar !')
                    })
                    .catch((err => res.status(500).json({ message: 'New avatar link failed', err })))
                ;
            }
        })
        .catch((err) => {
            const errors = uploadErrors(err);
            res.status(500).json({ message: 'Change avatar failed', errors});

        })
    ;
};
