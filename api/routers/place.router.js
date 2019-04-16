const express = require('express');
const router = express.Router();
const placeController = require("../controllers/place.controller");

router.get('/', placeController.getAll);
router.get('/:id', placeController.getById);
router.post('/', placeController.create);
router.put('/:id', placeController.update);
router.delete('/:id', placeController.delete);
router.get('/user/:userid', placeController.getAllByUserId);

module.exports = router;