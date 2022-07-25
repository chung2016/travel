const express = require('express')
const errorHandler = require('../middlewares/error-handler')
const router = express.Router()

router.use('/auth', require('./auth.router'))

router.use(errorHandler)

module.exports = router
