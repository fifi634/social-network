const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../config/.env'});

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, env.process.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentification token not authorized', error });
    }
}