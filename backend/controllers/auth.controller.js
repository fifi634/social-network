const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                email: req.body.email,
                password: hash,
                pseudo: req.body.pseudo,
                avatar_slug: req.body.avatar_slug,
            });
            user.save()
                .then ((user) => res.status(201).json({ message: 'User created !', user}))
                .catch (error => res.status(500).json({ message: 'Save new user failed ', error }))
            ;
        })
        .catch( error => res.status(500).json({ message: 'Password hash failed ', error }))
    ;




    // const {pseudo, email, password} = req.body;
    // try { 
    //     const user = await UserModel.create({pseudo, email, password});
    //     res.status(201).json({ user: user._id});
    //     console.log('user created: ', user.id);
    // } catch(err) {
    //     res.status(200).send({ err })
    // }
};

exports.login = (req, res, next) => {

}