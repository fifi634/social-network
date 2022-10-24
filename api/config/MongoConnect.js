const mongoose = require('mongoose');
require('dotenv').config();

// Mongo DB connection
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_PROJECT}`
    )
    .then(console.log('MongoDB connected :)'))
    .catch(err => console.log('Connection to MongoDB failed. ' + err))
;

