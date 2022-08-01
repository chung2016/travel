const uploadService = require('../services/upload.service')
const { Upload } = require('../../mongoose')

module.exports = {
  getFile,
  uploadFile,
}

async function getFile(req, res, next) {
  try {
    const filename = req.params.filename
    const upload = await Upload.findOne({ filename })
    if (!upload) throw 'File not found!'
    const { filebase64, mimetype, size } = upload
    res.writeHead(200, {
      'Content-Type': mimetype,
      'Content-Length': size,
    })
    res.end(Buffer.from(filebase64, 'base64'))
  } catch (error) {
    next(error)
  }
}

async function uploadFile(req, res, next) {
  try {
    const file = req.file
    if (!file) throw 'file required'
    const name = await uploadService.uploadImageToStorage(file)
    return res.status(200).send({ file: name })
  } catch (error) {
    next(error)
  }
}
