// Express
const express = require('express');
const app = express();
app.use(express.json());

<<<<<<< HEAD
// CORS headers


// Routes import
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Routes
// app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
=======
// Routes import
const userRoutes = require('./routes/user.routes');

// Routes
app.use('/api/auth', userRoutes);
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6

module.exports = app;