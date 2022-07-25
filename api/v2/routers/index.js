const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth.router'))

router.use((error, req, res, next) => {
  if (!error.statusCode) console.error(error.stack)
  const status = error.statusCode || 500
  const message = error.message || 'Something broke!'
  return res.status(status).json({ message })
})

module.exports = router
