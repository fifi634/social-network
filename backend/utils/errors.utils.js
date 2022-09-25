
// Errors messages
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' };
    
    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris";
    
    if (err.message.includes('email'))
        errors.email = 'Email incorrect';

    if (err.message.includes('password'))
        errors.password = 'Le mot de passe doit faire 6 caractères minimum';
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.mail = 'Cet email est déjà enregistré';
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.mail = 'Ce pseudo est déjà pris';

    return errors;
}