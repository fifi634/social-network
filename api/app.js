require('dotenv').config({path:'./config/.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// // CORS options
// const corsOptions = {
//     origin: process.env.DOMAIN_CLIENT_APP,
//     optionSuccessStatus: 200,
//     methods: 'GET, POST, PATCH, DELETE',
//     allowedHeaders: 'Origin, x-Requested-With, Accept, Content, Content-Type, Authorization',
//     credentials: true,
//     preflightContinue: true
// }

// App config
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors(corsOptions));


// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.DOMAIN_CLIENT_APP);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Accept, Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


// Routes & middleware imports
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

// // CORS pre-flight
// app.options('*', cors(corsOptions));

// Json Web Token
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user._id);
});


// Routes
app.use('/api/post', requireAuth, postRoutes);
app.use('/api/user', userRoutes);


module.exports = app;