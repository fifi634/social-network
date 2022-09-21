const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentarySchema = mongoose.Schema({ 
    commentary: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    user_id: { 
        type: String, 
        required: true,
<<<<<<< HEAD
        unique: true,
        trim: true 
=======
        unique: true 
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6
    },
    post_id: { 
        type: String, 
        required: true,
<<<<<<< HEAD
        unique: true,
        trim: true
    }
});

/* Play function before save into display: 'block' */
// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

exports = mongoose.model('commentary.model', commentarySchema);
=======
        unique: true 
    }
});

// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('commentary.model', commentarySchema);
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6
