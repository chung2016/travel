const express = require('express');
const router = express.Router();
const placeController = require("../controllers/place.controller");

router.get('/', placeController.getAll);
router.get('/:id', placeController.getById);
router.get('/user/:userid', placeController.getAllByUserId);
router.post('/', placeController.create);
router.put('/:id', placeController.update);
router.delete('/:id', placeController.delete);

module.exports = router;