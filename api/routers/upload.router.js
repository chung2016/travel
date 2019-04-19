const express = require('express');
const router = express.Router();


const googleStorage = require('@google-cloud/storage');

const storage = googleStorage({
    projectId: "travel-7c073",
    keyFilename: "api/key-file-name.json"
});
const bucketName = "travel-7c073.appspot.com";
const bucket = storage.bucket(bucketName);

const format = require('util').format;
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
    } else {
        throw 'file required';
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
            let uFile = storage
                .bucket(bucketName)
                .file(fileUpload.name)
                .makePublic();
            const url = format(createPublicFileURL(fileUpload.name));
            resolve(url);

        });

        blobStream.end(file.buffer);
    });
}

function createPublicFileURL(storageName) {
    return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(storageName)}?alt=media`;

}