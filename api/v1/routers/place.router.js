const express = require('express')
const router = express.Router()
const placeController = require('../controllers/place.controller')

router
  .get('/', placeController.getAll)
  .get('/:id', placeController.getById)
  .get('/user/:userid', placeController.getAllByUserId)
  .post('/', placeController.create)
  .put('/:id', placeController.update)
  .delete('/:id', placeController.destroy)

module.exports = router
