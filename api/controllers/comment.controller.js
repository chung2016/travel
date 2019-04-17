const commentService = require('../services/comment.service');

module.exports = {
    create,
    update,
    delete: _delete,
    getByPlaceId,
};

function create(req, res, next) {
    commentService
        .create(req.body)
        .then(comment => res.json(comment))
        .catch(err => next(err));
}

function update(req, res, next) {
    commentService
        .update(req.params.id, req.body)
        .then((comment) => res.json(comment))
        .catch(err => next(err));
}

function _delete() {
    commentService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByPlaceId(req, res, next) {
    commentService
        .getByPlaceId(req.params.placeid)
        .then(comments => res.json(comments))
        .catch(err => next(err));
}