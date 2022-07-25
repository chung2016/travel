const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

router
  .post('/', commentController.create)
  .delete('/:id', commentController.delete)
  .get('/place/:placeid', commentController.getByPlaceId)

module.exports = router
