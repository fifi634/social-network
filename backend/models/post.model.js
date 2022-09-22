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
        unique: true,
        trim: true
    },
    like_statut: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    user_id: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    }
});

/* Play function before save into display: 'block' */
// Mongoose Unique Validator config
postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('post', postSchema);
