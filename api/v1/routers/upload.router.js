const express = require('express')
const router = express.Router()

const Multer = require('multer')

const validate_format = require('../middlewares/validateFormat')
const uploadController = require('../controllers/upload.controller')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
  onError: function (err, next) {
    next(err)
  },
})

router
  .get('/:filename', uploadController.getFile)
  .post('/', multer.single('file'), validate_format, uploadController.uploadFile)

module.exports = router
