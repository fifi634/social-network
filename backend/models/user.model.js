const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        unique: true ,
        validate: [isEmail]
    },
    password: { 
        type: String, 
        required: true 
    },
    pseudo: { 
        type: String, 
        required: true 
    },
    avatar_slug: { 
        type: String, 
        required: false 
    },
    updated_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    admin_role: { 
        type: Boolean, 
        required: true, 
        default: false 
    }
})

// Mongoose Unique Validator config
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user.model', userSchema);