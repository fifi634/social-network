const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

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
        required: true,
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
        required: true, 
        default: false 
    },
}, { timestamps: true })

/* Play function before save into display: 'block' */
// Bcrypt
// userSchema.pre("save", async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });
// Mongoose unique validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user.model', userSchema);