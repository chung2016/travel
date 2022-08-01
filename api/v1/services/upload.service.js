const { Upload } = require('../../mongoose')

module.exports = {
  uploadImageToStorage,
}

async function uploadImageToStorage(file) {
  if (!file) throw 'No image file'
  const filename = `${file.originalname}_${Date.now()}`
  const filebase64 = Buffer.from(file.buffer).toString('base64')
  const filesize = file.size
  const originalname = file.originalname
  const mimetype = file.mimetype

  const upload = new Upload({
    filename,
    filebase64,
    originalname,
    mimetype,
    size: filesize,
  })
  await upload.save()
  return `${process.env.APP_URL}/api/v1/upload/${filename}`
}
