const UserModel = require('../models/user.model');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors.utils');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


// Dictionnary of extension
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};


// Get avatar picture : save picture into server, save picture link into database
exports.uploadProfil = async (req, res) => {

    console.log(req.file.mimetype);
    try {
        // Check format
        if ( 
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/webp" 
        ) throw Error('invalid file');

        // Check size
        if (req.file.size > 83886080) throw Error ("max size reached");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(206).json({ message: 'Upload profil picture failed', errors, err });
    }


    // Filename construct
    const extension = MIME_TYPES[req.file.mimetype];
    const name = req.file.originalname.split(' ').join('_')
    const fileName = name + Date.now() + '.' + extension;


    // Save file into server
    await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../../client/public/uploads/profil/${fileName}`)
    );

    
    // Save url files into database
    try {
        await UserModel.findByIdAndUpdate(
            { $set: {avatar_slug: './uploads/profil/' + filename} },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) return res.json({ message: "Avatar uploaded !", data });
                else return res.status(500).json({ message: "Avatar upload failed", err });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "Avatar upload error", err });
    }
};