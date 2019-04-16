const placeService = require('../services/place.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllByUserId
};

function getAll(req, res, next) {
    placeService
        .getAll()
        .then(places => res.json(places));
}

function getById(req, res, next) {
    placeService
        .getById(req.params.id)
        .then(place => (place ? res.json(place) : res.sendStatus(404)))
        .catch(err => next(err));
}

function create(req, res, next) {
    placeService
        .create(req.body)
        .then((place) => res.json(place))
        .catch(err => next(err));
}

function update(req, res, next) {
    placeService
        .update(req.params.id, req.body)
        .then((place) => res.json(place))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    placeService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByUserId(req, res, next) {
    placeService
        .getAllByUserId(req.params.userid)
        .then(places => res.json(places))
        .catch(err => next(err));
}