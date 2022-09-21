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
        unique: true,
        trim: true 
    },
    post_id: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    }
});

/* Play function before save into display: 'block' */
// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

exports = mongoose.model('commentary.model', commentarySchema);