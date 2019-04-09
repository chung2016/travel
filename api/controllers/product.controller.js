const productService = require('../services/product.service');

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete
};

function getAll(req, res, next) {
	productService
		.getAll()
		.then(products => res.json(products));
}
function getById(req, res, next) {
	productService
		.getById(req.params.id)
		.then(product => (product ? res.json(product) : res.sendStatus(404)))
		.catch(err => next(err));
}
function create(req, res, next) {
	productService
		.create(req.body)
		.then((product) => res.json(product))
		.catch(err => next(err));
}
function update(req, res, next) {
	productService
		.update(req.params.id, req.body)
		.then((product) => res.json(product))
		.catch(err => next(err));
}
function _delete(req, res, next) {
	productService
		.delete(req.params.id)
		.then(() => res.json({}))
		.catch(err => next(err));
}
