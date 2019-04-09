const express = require('express');
const router = express.Router();
const favoriteController = require("../controllers/favorite.controller");

router.post('/', favoriteController.create);
router.put('/:id', favoriteController.update);
router.delete('/:id', favoriteController.delete);
router.get('/user/:userid', favoriteController.getAllByUserId);

module.exports = router;