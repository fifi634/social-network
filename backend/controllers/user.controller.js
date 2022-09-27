const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

/* Find all users and return it */
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}


/* Find one user by id and return it sin password */
exports.userInfo = (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

    console.log('user info : ', req.params);
    
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) res.status(200).json(data);
        else res.status(404).send('User not found :', err);
    }).select('-password');
}


/* Find user by id and modify it */
exports.updateUser = async (req, res) => {
    // Check if uri is known into database
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        UserModel.findOneAndUpdate( 
            { _id: req.params.id }, 
            { $set: {
                email: req.body.email,
                password: req.body.password,
                pseudo: req.body.pseudo,
                avatar_slug: req.body.avatar_slug
            } }, 
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) return res.json({message: "User updated !", data});
                if (err) return res(500).send('User update error : ' + err );
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err })
    };
}


/* Erase user */
exports.deleteUser = async (req, res) => {
    UserModel.deleteOne({  _id: req.params.id })
        .then(user => res.status(200).json({ message: 'User successfully deleted', user }))
        .catch(error => res.status(400).json({ message: 'User delete error', error }))
    ;
}