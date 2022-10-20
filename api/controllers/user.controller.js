const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');
// const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const fs = require('fs');
const { signupErrors, updateProfilErrors } = require('../utils/errors.utils');

/* Find all users and return it */
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}


/* Find one user by id and return it sin password */
exports.userInfo = (req, res) => {

    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });
    
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) res.status(200).json(data);
        else res.status(404).send('User not found :', err);
    }).select('-password');
};


/* Find user by id and modify it */
exports.updateUser = (req, res) => {             
    // UserModel.findOne({ _id: req.auth.userId })
    //     .then(user => {
            // if (user._id != req.auth.userId) {                    
            //     return res.status(401).json({ message: 'Not authorized'});
            // } else {

                // // Erase old avatar picture if user want default avatar
                // const oldFilePath = `../client/public/${user.avatar_slug}`;
                //     if (!req.file && (oldFilePath.includes('avatar') == false && fs.existsSync(oldFilePath))) {
                //         fs.unlink(
                //             oldFilePath,
                //             (err => err ? 
                //             console.log('Avatar delete error (from user controller): ', err) 
                //             : console.log('Old avatar deleted !(from user controller)'))
                //         );
                //     }
                // ;
                    
                // // If doesn't file in upload, get client avatar_slug
                // if (!req.file) 
                //     UserModel.updateOne(
                //         {_id: req.auth.userId}, 
                //         {avatar_slug: req.body.avatar_slug},
                //         (err, data) => {
                //             if (err) return res.status(500).send('Link avatar error : ' + err );                              
                //         }
                //     )
                // ;
                    
                // // Bcrypt hash password
                // if (req.body.password !== null ) {
                //     bcrypt.hash(req.body.password, 10, (err, hash) => {
                //         if (err) console.log('hash password failed. ', err);
                //         else UserModel.updateOne(
                //             {_id: req.auth.userId}, 
                //             {password: hash}, 
                //             (err, data) => err ? console.log('Updated password failed.') : null
                //         );
                //     });
                // };

                // Bcrypt hash password and update info    
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.statut(500).json({ message: 'Hash password failed.', err}),
                        console.log('Hash password failed. ', err);
                    } else {
                        UserModel.updateOne(
                            {_id: req.auth.userId}, 
                            {
                                email: req.body.email,
                                password: hash, 
                                pseudo: req.body.pseudo,
                                avatar_slug: req.body.avatar_slug
                            },
                            (err, data) => {
                                if(err) {
                                    const errors = updateProfilErrors(err);
                                    console.log('errors ', errors);
                                    console.log('Update profil user failed. ', err);
                                    res.status(500).json({ message: 'Update user profil failed.', err });
                                } else {
                                    console.log(req.auth.userId + ' has updated his profil');
                                    res.json({ message: 'Profil user updated. ', data });
                                };
                            }
                        );
                    };
                });
    
                // };

                // // Upload user info
                // UserModel.updateOne(
                //     {_id: req.auth.userId},
                //     { 
                //         email: req.body.email,
                //         pseudo: req.body.pseudo,
                //     },
                //     (err, data) => {
                //         if (!err) {
                //             console.log(req.auth.userId + ' has updated his profil');
                //             return res.status(200).json({ message: "User updated !", data })
                //         };
                //         if (err) {                                
                //             return res.status(500).send('User update error : ' + err );
                //         }
                //     }
                // );
            // };
    //     })
    //     .catch((err) => {
    //         console.log('Update user profil failed. ', err);
    //         res.status(500).json({ message: 'Update user profil failed.', err});                
    //     })
    // ;
};


/* Erase user */
exports.deleteUser = async (req, res) => {
    // Check if it's an admin
    let admin = false;
    let user = await UserModel.findOne({_id: req.auth.userId});
    if (user.admin_role === true) admin = true;
    console.log('coucou')
    // // Erase all post posted by user
    // const existPost = true;

    // PostModel.findOne({posterId: req.auth.userId})
    //     .then((post) => {
    //         if(post.posterId !== req.authuserId && admin === false) {
    //             res.status(403).json({ message: 'Unauthorized for del posts user' });

    //         // If picture in post, erase it
    //         } else if(post.picture !== undefined) {                
    //             fs.unlink(`../client/public/${postpicture}`, () => {

    //                 // Erase post from database
    //                 PostModel.deleteOne({posterId: req.auth.userId}, (err, num) => {
    //                     if(!err) {
    //                         console.log(req.auth.userId + ' has deleted a post');
    //                     } else {
    //                         console.log('Delete failed : ' + err);
    //                     };
    //                 });
    //             });
    //         };
    //     })
    //     .catch(() => {
    //         existPost = false;
    //     })
    // ;


    UserModel.deleteOne({ _id: req.auth.userId })
        .then(() => {
            console.log(req.auth.userId + ' deleted');
            res.status(200).json({ message: 'User successfully deleted' });            
        })
        .catch(error => res.status(400).json({ message: 'User delete error', error }))
    ;

};