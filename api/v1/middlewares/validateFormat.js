const fileType = require('file-type')
const accepted_extensions = ['jpg', 'png', 'gif']

function validate_format(req, res, next) {
  if (req.file) {
    let mime = fileType(req.file.buffer)

    if (!mime || !accepted_extensions.includes(mime.ext))
      return next(
        new Error('The uploaded file is not in ' + accepted_extensions.join(', ') + ' format!')
      )
  }
  next()
}

module.exports = validate_format
