const db = require('../_helpers/db');
const Place = db.Place;

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getAllByUserId,
};

async function getAll() {
	return await Place.find().populate({ path: 'author' });
}

async function getById(id) {
	return await Place.findById(id).populate({ path: 'author', select: 'email username id' });
}

async function create(param) {
	const place = new Place(param);
	await place.save();
	return place;
}

async function update(id, param) {
	const place = await Place.findById(id);
	if (!place) throw 'Place not found';
	Object.assign(place, param);
	await place.save();
	return place;
}

async function _delete(id) {
	await Place.findOneAndDelete(id);
}

async function getAllByUserId(userid) {
	return await Place
		.where('author', userid).populate({ path: 'author', select: 'email username id' });
}