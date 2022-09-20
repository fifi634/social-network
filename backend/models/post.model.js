const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
    post: { 
        type: String, 
        required: true 
    },
    picture_slug: { 
        type: String, 
        required: false,
        unique: true
    },
    like_statut: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    user_id: { 
        type: String, 
        required: true,
        unique: true
    }
});

// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('post.model', postSchema);