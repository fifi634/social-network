const express = require('express');
const cookieParser = require('cookie-parser');

// App config
const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS headers


// Routes & middleware imports
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

// Json Web Token
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user._id);
});

// Routes
app.use('/api/post', requireAuth, postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;