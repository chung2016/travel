const express = require('express')
const errorHandler = require('../middlewares/error-handler')
const router = express.Router()

router
  .use('/auth', require('./auth.router'))
  .use('/posts', require('./post.router'))
  .use((req, res, next) => res.status(404).json({ message: 'Sorry cant find that!' }))
  .use(errorHandler)

module.exports = router
