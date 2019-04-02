const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
	authenticate,
	getAll,
	getById,
	create,
	update,
	delete: _delete
};

async function authenticate({ username, password }) {
	const user = await User.findOne({ username });
	if (user && user.comparePassword(password)) {
		const { password, ...userWithoutPassword } = user.toObject();
		const token = jwt.sign({ sub: user.id }, config.secret);
		return {
			...userWithoutPassword,
			token
		};
	}
}

async function getAll() {
	return await User.find().select('-password');
}

async function getById(id) {
	return await User.findById(id).select('-password');
}

async function create(userParam) {
	// validate
	if (await User.findOne({ username: userParam.username })) {
		throw 'Username "' + userParam.username + '" is already taken';
	}

	const user = new User(userParam);

	// save user
	await user.save();
}

async function update(id, userParam) {
	const user = await User.findById(id);

	// validate
	if (!user) throw 'User not found';
	if (
		user.username !== userParam.username &&
		(await User.findOne({ username: userParam.username }))
	) {
		throw 'Username "' + userParam.username + '" is already taken';
	}

	// copy userParam properties to user
	Object.assign(user, userParam);

	await user.save();
}

async function _delete(id) {
	await User.findOneAndDelete(id);
}
