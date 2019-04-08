const express = require('express');
const router = express.Router();
const attractionsService = require('../services/attractions.service');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  attractionsService
    .getAll()
    .then(attractions => res.json(attractions));
}
function getById(req, res, next) {
  attractionsService
    .getById(req.params.id)
    .then(attractions => (attractions ? res.json(attractions) : res.sendStatus(404)))
    .catch(err => next(err));
}
function create(req, res, next) {
    attractionsService
		.create(req.body)
		.then((attractions) => res.json(attractions))
		.catch(err => next(err));
}
function update(req, res, next) {
    attractionsService
		.update(req.params.id, req.body)
		.then((attractions) => res.json(attractions))
		.catch(err => next(err));
}
function _delete(req, res, next) {
    attractionsService
		.delete(req.params.id)
		.then(() => res.json({}))
		.catch(err => next(err));
}
