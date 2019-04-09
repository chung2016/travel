const express = require('express');
const router = express.Router();
const favoriteService = require('../services/favorite.service');

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/user/:userid', getAllByUserId);

module.exports = router;

function getAll(req, res, next) {
    favoriteService
        .getAll()
        .then(favorites => res.json(favorites));
}

function create(req, res, next) {
    favoriteService
        .create(req.body)
        .then(favorite => res.json(favorite))
        .catch(err => next(err));
}

function update(req, res, next) {
    favoriteService
        .update(req.params.id, req.body)
        .then((favorite) => res.json(favorite))
        .catch(err => next(err));
}

function _delete() {
    favoriteService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByUserId(req, res, next) {
    favoriteService
        .getAllByUserId(req.params.userid)
        .then(favorites => res.json(favorites))
        .catch(err => next(err));
}