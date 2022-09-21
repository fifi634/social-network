const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
<<<<<<< HEAD
// const bcrypt = require('bcrypt');
=======
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        unique: true ,
<<<<<<< HEAD
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
=======
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
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6
    },
    admin_role: { 
        type: Boolean, 
        required: true, 
        default: false 
<<<<<<< HEAD
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
=======
    }
})

// Mongoose Unique Validator config
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user.model', userSchema);