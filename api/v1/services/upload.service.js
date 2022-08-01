const { Upload } = require('../../mongoose')

module.exports = {
  uploadImageToStorage,
}

async function uploadImageToStorage(file) {
  if (!file) throw 'No image file'
  const { originalname, size, mimetype, buffer: filebuffer } = file

  const filebase64 = Buffer.from(filebuffer).toString('base64')

  const upload = await Upload.create({
    filename: originalname,
    filebase64,
    originalname,
    mimetype,
    size,
  })
  return `${process.env.APP_URL}/api/v1/upload/${upload.filename}`
}
