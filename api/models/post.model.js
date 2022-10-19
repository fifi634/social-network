const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    posterId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trime: true,
        // maxlength: 500
    },
    picture: {
        type: String
    },
    // video: {
    //     type: String
    // },
    likers: {
        type: [String],
        require: true,
        default: []
    },
    // comments: {
    //     type: [{
    //         commenterId: String,
    //         commenterPseudo: String,
    //         text: String,
    //         timestamp: Number
    //     }],
    //     required: true,
    //     default: []
    // },
}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);
