// Express
const express = require('express');
const app = express();
app.use(express.json());

// CORS headers


// Routes import
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Routes
// app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;