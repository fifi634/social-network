const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);


// Get avatar picture : save picture into server, save picture link into database
exports.uploadProfil = async (req, res) => {
    try {
        // Check format
        if ( 
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg" &&
            req.file.detectedMimeType != "image/webp"
        ) throw Error('invalid file');

        // Check size
        if (req.file.size > 10000000) throw Errror ("max size reached");

    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(206).json({ message: 'Upload avatar picture failed', errors, err });
    }


    // Filename construct
    const fileName = req.body.pseudo + ".jpg";


    // Traitment of upload file
    await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../../client/public/uploads/profil/${fileName}`)
    )
};