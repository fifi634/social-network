const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;




/* Find all users and return it */
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

/* Find one user by id and return it sin password */
exports.userInfo = (req, res) => {
    console.log('user info : ', req.params);
    // // Verification if 'id user requete' correspond with 'id user database'
    // if (!ObjectID.isValid(req.params.id))
    // return res.status(400).send('ID unknown : ' + req.params.id);
    
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) res.status(200).json(data);
        else res.status(404).json({ message:'Id unknown :', err });
    }).select('-password');
}

/* Find user by id and modify it */
exports.updateUser = async (req, res) => {
    // // Verification if 'id user requete' correspond with 'id user database'
    // if (!ObjectID.isValid(req.params.id)) 
    // return res.status(400).send('ID unknown : ' + req.params.id);
    
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
                if (!err) return res.send(data);
                if (err) return res(500).send({ message: 'Update error: ', err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err })
    };
}

/* Erase user */
exports.deleteUser = async (req, res) => {
    UserModel.deleteOne({  _id: req.params.id })
        .then(user => res.status(200).json({ message: 'Successfully deleted', user }))
        .catch(error => res.status(400).json({ message: 'Delete failed', error }))
    ;
}