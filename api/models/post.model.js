const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    posterId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trime: true,
    },
    picture: {
        type: String
    },
    likers: {
        type: [String],
        require: true,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);
