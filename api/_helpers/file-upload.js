const googleStorage = require('@google-cloud/storage');

const storage = googleStorage({
    projectId: "travel-34f37",
    keyFilename: "api/key-file-name.json"
});

module.exports = storage.bucket("travel-34f37.appspot.com");