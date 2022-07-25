const express = require('express')
const authUser = require('../middlewares/auth-user')
const authController = require('../controllers/auth.controller')
const validate = require('../middlewares/validation')
const router = express.Router()
const authValidator = require('../validators/auth.validator')

router
  .post('/register', validate(authValidator.register), authController.register)
  .post('/login', validate(authValidator.login), authController.login)
  .post('/logout', authUser, authController.logout)
  .get('/me', authUser, authController.me)
  .post('/token', authUser, validate(authValidator.token), authController.token)

module.exports = router
