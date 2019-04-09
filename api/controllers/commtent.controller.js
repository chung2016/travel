const express = require('express');
const router = express.Router();
const commentService = require('../services/comment.service');

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    commentService
        .getAll()
        .then(comments => res.json(comments));
}

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
