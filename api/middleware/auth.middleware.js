const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
require('dotenv').config({path:'../config/.env'});


// Check if token is known in database
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    let user = '';

    if (token) {        
        jwt.verify(
            token, 
            process.env.RANDOM_TOKEN_SECRET, 
            async (err, decodedToken) => {
                if (err) {
                    req.auth = null;
                    res.cookie('jwt', '', { maxAge: 1 });
                    console.log('Authentification error : ', err);
                } else {
                    const userId = decodedToken.id;
                    req.auth = { userId: userId };
                    user = await UserModel.findById(decodedToken.id);
                    res.status(200).locals.user = user;
                    next();
                };
            }
        );
    } else {
        res.status(401).json({ message : 'Unauthorized'})
    };
};