const express = require('express')
const jwt = require('../_helpers/jwt')
const router = express.Router()
const errorHandler = require('../_helpers/error_handles')

router
  .use('/', jwt()) // use JWT auth to secure the api
  // api routes
  .use('/users', require('./user.router'))
  .use('/profile', require('./profile.router'))
  .use('/places', require('./place.router'))
  .use('/comments', require('./comment.router'))
  .use('/upload', require('./upload.router'))
  .use(errorHandler) // global error handler

module.exports = router
