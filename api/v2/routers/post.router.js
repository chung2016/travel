const express = require('express')
const postController = require('../controllers/post.controller')
const router = express.Router()
const authUser = require('../middlewares/auth-user')
const validate = require('../middlewares/validation')
const postValidator = require('../validators/post.validator')

router
  .get('/', postController.getAll)
  .get('/:id', postController.get)
  .post('/', authUser, validate(postValidator.create), postController.create)
  .put('/:id', authUser, validate(postValidator.update), postController.update)
  .delete('/:id', authUser, postController.delete)

module.exports = router
