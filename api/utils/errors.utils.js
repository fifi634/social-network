const { MulterError } = require("multer");

const errorSamePseudo = ['pseudo', 'unique'];

// Sign up errors message
exports.signupErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' };
    
    if (err.message.includes('pseudo'))
    errors.pseudo = "Pseudo déjà pris";
    
    if (err.message.includes('email'))
    errors.email = 'Email incorrect ou déjà pris';

    if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire 6 caractères minimum';
    
    return errors;
};

// Login error message
exports.loginErrors = (err) => {
    let errors = { login: '' };

    if (err) 
    return errors = { login: "La connection a échoué" };
};

// Upload error message
exports.uploadErrors = (err) => {
    let errors = { format: "", maxSize: "" };

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatible"
    ;

    if (err.message.includes('file too large'))
        errors.maxSize = "Le fichier dépasse 10Mo"
    ;

    return errors;
};


// Validation password error
exports.passwordErrors = (err) => {
    let allErrors = [];
    err.forEach(element => { allErrors.push(element.message) });
    let errors = 'Votre mot de passe ' + allErrors.join(', ') + '.';
    return errors;    
}