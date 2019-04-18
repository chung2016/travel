const express = require('express');
const router = express.Router();

const format = require('util').format;
const bucket = require("../_helpers/file-upload");
const Multer = require('multer');
const fileType = require('file-type');

const accepted_extensions = ['jpg', 'png', 'gif'];

function validate_format(req, res, next) {
    if (req.file) {
        let mime = fileType(req.file.buffer);

        if (!mime || !accepted_extensions.includes(mime.ext))
            return next(new Error('The uploaded file is not in ' + accepted_extensions.join(", ") + ' format!'));
    }
    next();
}

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    },
    onError: function (err, next) {
        next(err);
    }
});

router.post('/', multer.single('file'), validate_format, (req, res, next) => {
    let file = req.file;
    if (file) {
        uploadImageToStorage(file).then((name) => {
            res.status(200).send({
                file: name
            });
        }).catch((error) => {
            next(error)
        });
    }
});
module.exports = router;


const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', error => {
            reject('Something is wrong! Unable to upload at the moment. Message ' + error);

        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            resolve(url);

        });

        blobStream.end(file.buffer);
    });
}