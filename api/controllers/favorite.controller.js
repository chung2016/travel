const favoriteService = require('../services/favorite.service');

module.exports = {
    create,
    update,
    delete: _delete,
    getAllByUserId
};

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