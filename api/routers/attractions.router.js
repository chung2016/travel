const express = require('express');
const router = express.Router();
const attractionsController = require("../controllers/attractions.controller");

router.get('/', attractionsController.getAll);
router.get('/:id', attractionsController.getById);
router.post('/', attractionsController.create);
router.put('/:id', attractionsController.update);
router.delete('/:id', attractionsController.delete);
router.get('/user/:userid', attractionsController.getAllByUserId);

module.exports = router;