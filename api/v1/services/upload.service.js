const sharp = require('sharp')
const fileType = require('file-type')
const { Upload } = require('../../mongoose')

module.exports = {
  uploadImageToStorage,
}

const UPLOAD_MAX_SIZE = process.env.UPLOAD_MAX_SIZE || 100

async function uploadImageToStorage(file) {
  if (!file) throw 'No image file'
  const { originalname, buffer } = file
  const filebuffer = await _resizeImage(buffer)
  const filesize = Buffer.byteLength(filebuffer)
  const filemimetype = fileType(filebuffer).mime
  const filebase64 = Buffer.from(filebuffer).toString('base64')

  const upload = await Upload.create({
    filename: originalname,
    filebase64,
    originalname,
    mimetype: filemimetype,
    size: filesize,
  })
  return `${process.env.APP_URL}/api/v1/upload/${upload.filename}`
}

async function _resizeImage(filebuffer) {
  const metadata = await sharp(filebuffer).metadata()

  if (metadata.width > UPLOAD_MAX_SIZE) {
    filebuffer = await sharp(filebuffer).resize({ width: UPLOAD_MAX_SIZE }).toBuffer()
  } else if (metadata.height > UPLOAD_MAX_SIZE) {
    filebuffer = await sharp(filebuffer).resize({ height: UPLOAD_MAX_SIZE }).toBuffer()
  }

  return filebuffer
}
