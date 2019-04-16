const userService = require('../services/user.service');

module.exports = {
	getById,
};

function getById(req, res, next) {
	userService
		.getById(req.params.id)
		.then(user => (user ? res.json(user) : res.sendStatus(404)))
		.catch(err => next(err));
}