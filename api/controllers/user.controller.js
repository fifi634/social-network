const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const { updateProfilErrors } = require('../utils/errors.utils');

/* Find all users and return it sin password */
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};


/* Find one user by id and return it sin password */
exports.userInfo = (req, res) => {

    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(401).json({ message: 'ID unknown : ' + req.params.id });
    
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) res.status(200).json(data);
        else res.status(404).json({ message: 'User not found :', err });
    }).select('-password');
};


/* Find user by id, hash password and modify it */
exports.updateUser = (req, res) => {   
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
};


/* Erase user */
exports.deleteUser = async (req, res, next) => {
    UserModel.deleteOne({ _id: req.auth.userId })
        .then(() => {
            console.log(req.auth.userId + ' deleted');
            res.status(200).json({ message: 'User successfully deleted' });            
        })
        .catch((err) => {
            console.log('User delete error. ', err);
            res.status(400).json({ message: 'User delete error', err })
        })        
    ;
};