const db = require('../_helpers/db');
const Attractions = db.Attractions;

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getAllByUserId,
};

async function getAll() {
	return await Attractions.find().populate({ path: 'author' });
}

async function getById(id) {
	return await Attractions.findById(id).populate({ path: 'author' });
}

async function create(param) {
	const attractions = new Attractions(param);
	await attractions.save();
	return attractions;
}

async function update(id, param) {
	const attractions = await Attractions.findById(id);
	if (!attractions) throw 'Attractions not found';
	Object.assign(attractions, param);
	await attractions.save();
	return attractions;
}

async function _delete(id) {
	await Attractions.findOneAndDelete(id);
}

async function getAllByUserId(userid) {
	return await Attractions
		.where('user', userId)
}