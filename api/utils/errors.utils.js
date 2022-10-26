// Signup errors
exports.signupErrors = (err) => {
    let errors = { pseudo: '', email: '' };
    
    if (err.message.includes('pseudo'))
    errors.pseudo = "Un pseudo est obligatoire et doit comporter au maximum 15 caractères.";
    
    if (err.message.includes('email'))
    errors.email = 'Email incorrect ou déjà pris';
    
    return errors;
};


// Login error message
exports.loginErrors = (err) => {
    let errors = { login: '' };

    if (err) return errors = { login: "La connection a échoué" };
};


// Validation password error
exports.passwordErrors = (err) => {
    let allErrors = [];
    err.forEach(element => { allErrors.push(element.message) });
    let errors = 'Votre mot de passe ' + allErrors.join(', ') + '.';
    return errors;    
}