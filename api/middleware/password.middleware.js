const passwordValidator = require('password-validator');
const { passwordErrors } = require('../utils/errors.utils');


// Schema of password
let passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8, 'doit contenir au moins 8 caractères')    
    .is().max(100, 'ne doit pas dépasser 100 caractères')    
    .has().uppercase(1, ' doit contenir au moins 1 majuscule')
    .has().lowercase(1, ' doit contenir au moins 1 minuscule') 
    .has().digits(2, ' doit avoir au moins 2 chiffres')
    .has().not().spaces(0, " ne doit pas contenir d'espace")
    .is().not().oneOf(['Passw0rd', 'Password123'], 'et est interdit')
;


// Check quality of password and export it
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        const errors = passwordErrors((passwordSchema.validate(req.body.password, {details: true})));
        return res.status(200).json({ message: 'Password not accepted', errors });
    };
};