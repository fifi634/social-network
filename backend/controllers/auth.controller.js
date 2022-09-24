const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../config/.env'});

// Password hash, create user object and save it in serveur 
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
    // Authentification token generation
    const maxAge = 3* 24 * 60 * 60 * 1000;
    const createToken = (id) => {
        return jwt.sign({id}, process.env.RANDOM_TOKEN_SECRET, { expiresIn: maxAge })
    };

    try {
        // User check
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Login failed' });
        };

        // Password check
        const comparePassword = await bcrypt.compare(req.body.password, user.password);

        // Login and input token in cookie
        if (comparePassword && user) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge });
            res.status(200).json({
                message: 'You are logged in!',
                userId: user._id
            });
            return user;            
        } else {
            res.status(401).json({ message: 'Login failed' });
        };
    } catch(error) {
        return res.status(500).send({
            error: true,
            reason: error.message
        });
    };

}

// Erase jwt cookie
exports.logout = async (req, res) => {
    res
        .cookie('jwt', '', { maxAge: 1 })
        .status(200) 
        .redirect('/login')
    ;
}