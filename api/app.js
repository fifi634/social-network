require('dotenv').config({path:'./config/.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// App config
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('file'))


// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.DOMAIN_CLIENT_APP);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content, Accept, Content-Type, Authorization, *');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


// Routes & middleware imports
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const { requireAuth } = require('./middleware/auth.middleware');


// Json Web Token
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user._id);
});


// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


module.exports = app;