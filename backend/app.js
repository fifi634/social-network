// Express
const express = require('express');
const app = express();
app.use(express.json());

// Routes import
const userRoutes = require('./routes/user.routes');

// Routes
app.use('/api/auth', userRoutes);

module.exports = app;