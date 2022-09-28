const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// Extension dictionnary
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

// Get avatar picture : save it into server, save picture link into database
exports.uploadProfil = async (req, res) => {
    try {
        // Check format
        if (
            req.file.detectedMimeType !== MIME_TYPES
            // "image/jpg" &&
            // req.file.detectedMimeType !== "image/png" &&
            // req.file.detectedMimeType !== "image/jpeg" &&
            // req.file.detectedMimeType !== "image/webp"
        ) throw Error('Invalid file');

        // Check size
        if (req.file.size > 500000) throw Errror ("Max size reached");
    } catch (err) {
        return res.status(400).json({ message: 'Upload avatar picture failed', err });
    }

    // Traitment of upload file
    const extension = MIME_TYPES[file.mimetype];
    const fileName = req.body.pseudo + extension;


    // await pipeline(
    //     req.file.stream,
    //     fs.createWriteStream(`${__dirname}/../client/public/uploads/profil/${filename}`);
    // )
};