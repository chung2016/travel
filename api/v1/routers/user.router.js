const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router
  .post('/authenticate', userController.authenticate)
  .post('/register', userController.register)
  .get('/', userController.getAll)
  .get('/current', userController.getCurrent)
  .get('/:id', userController.getById)
  .put('/:id', userController.update)
  .delete('/:id', userController.destroy)

module.exports = router
