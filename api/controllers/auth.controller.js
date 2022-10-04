const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {signupErrors, loginErrors} = require('../utils/errors.utils');
require('dotenv').config({path:'../config/.env'});



// Password hash, create user object and save it into serveur 
exports.signup = async (req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, password});
        const userId = user._id;
        res.status(201).json({ message: 'User created !', userId: user._id});
        console.log(userId + ' created !');
  
    } catch (err) {
        const errors = signupErrors(err);
        res.status(200).json({ message: 'Create user failed', errors });
    }
};


// Check ids, genearate and insert token in cookie, return user Id and user object by auth middleware
exports.login = async (req, res, next) => {
    // Token generation
    const maxAge = 3* 24 * 60 * 60 * 1000;
    const createToken = (id) => {
        return jwt.sign({id}, process.env.RANDOM_TOKEN_SECRET, { expiresIn: maxAge });
    };

    try {
        const user = await UserModel.login(req.body.email, req.body.password);
        const token = createToken(user._id);
        await res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({
            message: "You are logged in !", 
            userId: user._id 
        });
    } catch(err) {
        const errors = loginErrors(err);
        res.status(401).json({ errors });
    };
};

// Erase jwt cookie
exports.logout = (req, res) => {
    req.auth = null;
    res.cookie('jwt', '', { maxAge: 1 }).status(200).redirect('/login');
};