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
        unique: true 
    },
    post_id: { 
        type: String, 
        required: true,
        unique: true 
    }
});

// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('commentary.model', commentarySchema);