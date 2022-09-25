const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({    
    email: { 
        type: String, 
        required: true,
        unique: true ,
        validate: [isEmail],
        minLength: 5,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        minLength: 6
    },
    pseudo: { 
        type: String, 
        required: false,
        unique: true,
        trim: true 
    },
    avatar_slug: { 
        type: String, 
        required: false,
        trim: true,
        default: "./uploads/profil/male_avatar.svg"
    },
    likes: {
        type: [String]
    },
    admin_role: { 
        type: Boolean,
        default: false
    }
}, { timestamps: true });

/* Play function before save into display: 'block' */
// Mongoose unique validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);