const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
require('dotenv').config({path:'../config/.env'});


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                email: req.body.email,
                password: hash,
                pseudo: req.body.pseudo,
                avatar_slug: req.body.avatar_slug,
            });
            user.save()
                .then ((user) => res.status(201).json({ message: 'User created !', user}))
                .catch (error => res.status(500).json({ message: 'Save new user failed', error }))
            ;
        })
        .catch( error => res.status(500).json({ message: 'Password hash failed', error }))
    ;
}

exports.login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        // If user not found
        if (!user) {
            return res.status(401).json( {message: 'Login failed'} );
        }
        //Decrypt Password
        const passwordHash = await bcrypt.hash(req.body.password, user.password);
        if (passwordHash === user.password) {
            res.status(200).json( {
                message: 'You are logged in!',
                userId: user._id,
                token: process.env.TOKEN
            } );
        } else {
            res.status(401).json( {message: 'Login failed'} );
        }
    } catch(error) {
        return res.status(500).send({
            error: true,
            reason: err.message
        })
    }

}