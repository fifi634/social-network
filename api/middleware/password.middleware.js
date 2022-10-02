const passwordValidator = require('password-validator');


// Schema of password
let passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)    
    .is().max(100)    
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123'])
;


// Check quality of password and export it
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ 
            error: `Your password must have : 8 characters, 2 digits, with upper and lowercase. Space is not authorize. This is problematic in your password : ${(passwordSchema.validate(req.body.password, {list: true}))}`
        });
    } 
};