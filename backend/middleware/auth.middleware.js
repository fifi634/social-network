const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
require('dotenv').config({path:'../config/.env'});

// Check if user is connected and return it in 'locals'
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(
            token, 
            process.env.RANDOM_TOKEN_SECRET, 
            async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.cookie('jwt', '', { maxAge: 1 });
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            }
        )            
    } else {
        res.locals.user = null;
        next();
    }
}

// Check if token is known in database
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token, 
            process.env.RANDOM_TOKEN_SECRET, 
            async (err, decodedToken) => {
                if (err) {
                    console.log('Authentification failed. ', err);
                } else {
                    console.log('User connected : ' + decodedToken.id);
                    next();
                }
            }
        )
    } else {
        console.log('Authentification failed');
    }
}