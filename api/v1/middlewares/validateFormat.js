const fileType = require('file-type')
const ACCEPTED_EXTENSIONS = ['jpg', 'png', 'gif']

function validate_format(req, res, next) {
  if (req.file) {
    const mime = fileType(req.file.buffer)

    if (!mime || !ACCEPTED_EXTENSIONS.includes(mime.ext))
      return next(
        new Error('The uploaded file is not in ' + ACCEPTED_EXTENSIONS.join(', ') + ' format!')
      )
  }
  next()
}

module.exports = validate_format
