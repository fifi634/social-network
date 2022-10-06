const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({    
    pseudo: { 
        type: String, 
        required: true,
        unique: true,
        maxlength: 15,
        trim: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: [isEmail],
        minlength: 5,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6,
        trim: true
    },
    avatar_slug: { 
        type: String, 
        trim: true,
        default: "./uploads/profil/male_avatar.svg"
    },
    likes: {
        type: [String],
        require: true,
        default: []
    },
    admin_role: { 
        type: Boolean,
        require: true,
        default: false
    }
}, { timestamps: true });


/* Play function before save into display: 'block' */
// Mongoose unique validator
userSchema.plugin(uniqueValidator);

// Bcrypt crypting password
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Bcrypt uncrypting password
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error('La connection a échoué');
    }
    throw Error('La connection a échoué');
};


module.exports = mongoose.model('user', userSchema);