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
<<<<<<< HEAD
        unique: true,
        trim: true
=======
        unique: true
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6
    },
    like_statut: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    user_id: { 
        type: String, 
        required: true,
<<<<<<< HEAD
        unique: true,
        trim: true
    }
});

/* Play function before save into display: 'block' */
// Mongoose Unique Validator config
postSchema.plugin(uniqueValidator);

exports = mongoose.model('post.model', postSchema);
=======
        unique: true
    }
});

// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('post.model', postSchema);
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6
