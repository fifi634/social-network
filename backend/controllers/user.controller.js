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
    // Verification if 'id user requete' correspond with 'id user database'
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);
    
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) res.send(data);
        else console.log('ID unknown : ' + err);
    }).select('-password');
}

/* Find user by id and modify it */
exports.updateUser = async (req, res) => {
    // Verification if 'id user requete' correspond with 'id user database'
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        UserModel.findOneAndUpdate( 
            { _id: req.params.id }, {
                $set: {
                    bio: req.body.bio
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) return res.send(data);
                if (err) return res(500).send({ message: 'Update error: ', err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err })
    };
}

exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: 'Successfully deleted.' });
    } catch (err) {
        return res.status(500).json({ message: 'Remove error: ', err })
    };
}